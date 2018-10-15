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
  FETCH_REQUEST,
} from "../actions/constants";
import {
  signInComplete,
  signOutError,
  signOutComplete,
  signUpComplete,
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

export function* signIn(action) {
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

export function* signUp(action) {
  const { username, email, password, accept, provider } = action;

  try {
    const service = getAuthService(provider);

    const response = yield service.createUser({
      username,
      email,
      password,
      accept,
    });

    yield put(signUpComplete({ attributes: response, provider }));
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
  [AUTH_SIGNIN + FETCH_REQUEST, signIn],
  [AUTH_SIGNOUT + FETCH_REQUEST, signOut],
  [AUTH_SIGNUP + FETCH_REQUEST, signUp],
];

export default auth;
