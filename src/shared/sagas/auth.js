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
  AUTH_ADMIN_CREATE_USER,
  FETCH_REQUEST,
} from "../actions/constants";
import {
  signIn,
  signInComplete,
  signOutError,
  signOutComplete,
  signUpComplete,
  lostPasswordComplete,
} from "../actions/auth";
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

export function* createUser(action, func) {
  const { username, email, password, accept, provider } = action;
  try {
    const service = getAuthService(provider);

    const response = yield service.createUser({
      username,
      email,
      password,
      accept,
    });

    yield put(signUpComplete({ ...response, provider }));
    if (func) yield call(func, service, response);
  } catch (error) {
    if (error.response) {
      const response = yield error.response.json();
      yield put(signOutError({ provider, error: response.error || error }));
    } else {
      yield put(signOutError({ provider, error }));
    }
  }
}

export function* signUp(action) {
  function* authAndSignIn(service, response) {
    if (response.validation === "none") {
      const { username, password, provider } = action;
      const scope = yield service.authorizeUser({
        username,
        password,
        scope: "owner",
      });
      if (scope) {
        yield put(signIn({ provider, username, password }));
      }
    }
  }

  yield* createUser(action, authAndSignIn);
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

const auth = [
  [AUTH_INIT_SETTINGS, authInit],
  [AUTH_SIGNIN + FETCH_REQUEST, callSignIn],
  [AUTH_SIGNOUT + FETCH_REQUEST, signOut],
  [AUTH_SIGNUP + FETCH_REQUEST, signUp],
  [AUTH_LOSTPASSWORD + FETCH_REQUEST, lostPassword],
  [AUTH_ADMIN_CREATE_USER + FETCH_REQUEST, createUser],
];

export default auth;
