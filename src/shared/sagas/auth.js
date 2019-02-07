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
  createUserInfo,
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
    yield put(signOutError({ provider, error }));
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
    yield service.logoutUser();
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
    // Validation error not really error
    response = { error };
    if (error.type === "info") {
      yield put(createUserSuccess());
      yield put(createUserInfo({ info: error }));
    } else {
      yield put(createUserFailure({ error }));
    }
  }

  return response;
}

export function* signUp(action) {
  const { provider, username, password } = action;

  const response = yield createUser(action, false);
  if (!response.error) {
    try {
      if (response.scope) {
        delete response.scope;
        yield put(signIn({ provider, username, password }));
      }
      yield put(signUpComplete({ ...response, provider }));
    } catch (error) {
      yield put(signOutError({ provider, error }));
    }
  } else if (response.error.type !== "info") {
    yield put(signOutError({ provider, ...response }));
  }
}

export function* lostPassword(action) {
  const { email, provider } = action;

  try {
    const service = getAuthService(provider);
    const response = yield service.lostPassword({ email });
    yield put(lostPasswordComplete({ attributes: response, provider }));
  } catch (error) {
    yield put(signOutError({ provider, error }));
  }
}

export function* updateAccountState(action) {
  try {
    yield getAuthService().updateAccountState(action);
    yield put(adminUpdateAccountStateSuccess());
  } catch (error) {
    yield put(adminUpdateAccountStateFaillure({ error }));
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
