/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { put, take, race, call } from "redux-saga/effects";
import {
  AUTH_INIT_SETTINGS,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_SIGNUP,
  AUTH_LOSTPASSWORD,
  AUTH_CREATEUSER,
  AUTH_UPDATE_STATE,
  FETCH_REQUEST,
} from "../actions/constants";
import {
  signIn,
  signInComplete,
  signOutError,
  signOutComplete,
  signUpComplete,
  lostPasswordComplete,
  createUserSuccess,
  createUserFailure,
  adminUpdateAccountStateSuccess,
  adminUpdateAccountStateFaillure,
} from "../actions/auth";
import { createProfile } from "./api";
import { getAuthService } from "../services";

function* authenticate({ username, password, provider }) {
  try {
    const service = getAuthService(provider);

    const response = yield service.authenticateUser({ username, password });

    yield put(signInComplete({ attributes: response, provider }));
  } catch (error) {
    if (error.response) {
      const response = yield error.response.json();
      yield put(signOutError({ provider, error: response.error || error }));
    } else {
      yield put(signOutError({ provider, error }));
    }
  }
}

export function* authInit() {
  const service = getAuthService();

  if (service.isAccessTokenValid()) {
    const attributes = service.getAttributes();

    yield put(signInComplete({ attributes }));
  }
}

export function* signOut(action) {
  const { provider } = action;
  try {
    const service = getAuthService(provider);
    yield service.resetAccess();
    yield put(signOutComplete({ provider }));
  } catch (error) {
    yield put(signOutError({ provider, error: error.message }));
  }
}

export function* callSignIn(action) {
  const { username, password, provider } = action;

  const winner = yield race({
    auth: call(authenticate, { username, password, provider }),
    signOut: take(AUTH_SIGNOUT),
  });

  if (winner.auth) {
    // yield put({ type: AUTH_SIGNIN, newAuthState: true });
  } else if (winner.signOut) {
    // yield put({ type: AUTH_SIGNIN, newAuthState: false });
    yield call(signOut);
  }
}

export function* createUser(action, needProfile = true) {
  const { username, email, password, accept, provider } = action;
  let response;

  try {
    const service = getAuthService(provider);

    response = yield service.createUser({
      username,
      email,
      password,
      accept,
    });

    response.scope = yield service.authorizeUser({
      username,
      password,
      scope: "owner",
    });

    // don't create profile if is signup action
    // user not authentified
    if (needProfile) {
      const profile = yield createProfile({ userId: response.id });
      if (profile.error) {
        throw profile.error;
      }
    }

    yield put(createUserSuccess());
  } catch (error) {
    if (error.response) {
      response = { error: yield error.response.json() };
      yield put(createUserFailure(response.error));
    } else {
      response = error;
      yield put(createUserFailure(error));
    }
  }

  return response;
}

export function* signUp(action) {
  const { provider, username, password } = action;

  let response = yield createUser(action, false);
  if (!response.error) {
    try {
      if (response.scope) {
        delete response.scope;
        yield put(signIn({ provider, username, password }));
      }
      yield put(signUpComplete({ ...response, provider }));
    } catch (error) {
      if (error.response) {
        response = yield error.response.json();
        yield put(signOutError({ provider, error: response.error || error }));
      } else {
        yield put(signOutError({ provider, error }));
      }
    }
  } else {
    yield put(signOutError({ provider, ...response.error }));
  }
}

export function* lostPassword(action) {
  const { email, provider } = action;

  try {
    const service = getAuthService(provider);
    const response = yield service.lostPassword({ email });
    yield put(lostPasswordComplete({ attributes: response, provider }));
  } catch (error) {
    if (error.response) {
      const response = yield error.response.json();
      yield put(signOutError({ provider, error: response.error || error }));
    } else {
      yield put(signOutError({ provider, error }));
    }
  }
}

export function* updateAccountState(action) {
  try {
    yield getAuthService().updateAccountState(action);
    yield put(adminUpdateAccountStateSuccess());
  } catch (error) {
    if (error.response) {
      const response = yield error.response.json();
      yield put(
        adminUpdateAccountStateFaillure({ error: response.error || error }),
      );
    } else {
      yield put(adminUpdateAccountStateFaillure({ error }));
    }
  }
}

const auth = [
  [AUTH_INIT_SETTINGS, authInit],
  [AUTH_SIGNIN + FETCH_REQUEST, callSignIn],
  [AUTH_SIGNOUT + FETCH_REQUEST, signOut],
  [AUTH_SIGNUP + FETCH_REQUEST, signUp],
  [AUTH_LOSTPASSWORD + FETCH_REQUEST, lostPassword],
  [AUTH_CREATEUSER + FETCH_REQUEST, createUser],
  [AUTH_UPDATE_STATE + FETCH_REQUEST, updateAccountState],
];

export default auth;
