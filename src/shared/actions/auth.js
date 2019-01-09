/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_SIGNUP,
  AUTH_LOSTPASSWORD,
  AUTH_CREATEUSER,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from "./constants";

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
