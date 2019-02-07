/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  AUTH_LOAD_INITIAL_STATE,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_SIGNUP,
  AUTH_LOSTPASSWORD,
  AUTH_CREATEUSER,
  AUTH_UPDATE_STATE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_INFO,
} from "./constants";

export function loadInitialState() {
  return { type: AUTH_LOAD_INITIAL_STATE };
}
export function signIn({ provider, username, email, password, accept }) {
  return {
    type: AUTH_SIGNIN + FETCH_REQUEST,
    provider,
    username,
    email,
    password,
    accept,
  };
}

export function signInComplete({ attributes, provider }) {
  return {
    type: AUTH_SIGNIN + FETCH_SUCCESS,
    attributes,
    provider,
  };
}

export function signInError({ provider, error }) {
  return {
    type: AUTH_SIGNIN + FETCH_FAILURE,
    provider,
    error,
  };
}

export function signOutComplete({ provider }) {
  return {
    type: AUTH_SIGNOUT + FETCH_SUCCESS,
    provider,
  };
}

export function signOutError({ provider, error }) {
  return {
    type: AUTH_SIGNOUT + FETCH_FAILURE,
    provider,
    error,
  };
}

export function signOut({ provider }) {
  return {
    type: AUTH_SIGNOUT + FETCH_REQUEST,
    provider,
  };
}

export function signUp({ provider, username, email, password, accept }) {
  return {
    type: AUTH_SIGNUP + FETCH_REQUEST,
    provider,
    username,
    email,
    password,
    accept,
  };
}

export function signUpComplete({ attributes, provider }) {
  return {
    type: AUTH_SIGNUP + FETCH_SUCCESS,
    attributes,
    provider,
  };
}

export function signUpError({ provider, error }) {
  return {
    type: AUTH_SIGNUP + FETCH_FAILURE,
    provider,
    error,
  };
}

export function createUserRequest({
  provider,
  username,
  email,
  password,
  accept,
}) {
  return {
    type: AUTH_CREATEUSER + FETCH_REQUEST,
    provider,
    username,
    email,
    password,
    accept,
  };
}
export function createUserSuccess() {
  return { type: AUTH_CREATEUSER + FETCH_SUCCESS };
}
export function createUserFailure({ error }) {
  return { type: AUTH_CREATEUSER + FETCH_FAILURE, error };
}
export function createUserInfo({ info }) {
  return { type: AUTH_CREATEUSER + FETCH_INFO, info };
}

export function lostPassword({ provider, email }) {
  return {
    type: AUTH_LOSTPASSWORD + FETCH_REQUEST,
    provider,
    email,
  };
}

export function lostPasswordComplete({ attributes, provider }) {
  return {
    type: AUTH_LOSTPASSWORD + FETCH_SUCCESS,
    attributes,
    provider,
  };
}

export function lostPasswordError({ provider, error }) {
  return {
    type: AUTH_LOSTPASSWORD + FETCH_FAILURE,
    provider,
    error,
  };
}

export function adminUpdateAccountStateRequest(newState, userId) {
  return {
    type: AUTH_UPDATE_STATE + FETCH_REQUEST,
    newState,
    userId,
  };
}
export function adminUpdateAccountStateSuccess() {
  return { type: AUTH_UPDATE_STATE + FETCH_SUCCESS };
}
export function adminUpdateAccountStateFaillure({ error }) {
  return { type: AUTH_UPDATE_STATE + FETCH_FAILURE, error };
}
