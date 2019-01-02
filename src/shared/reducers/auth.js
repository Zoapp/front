/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_SIGNUP,
  AUTH_LOSTPASSWORD,
  AUTH_ADMIN_CREATE_USER,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions/constants";

export const initialState = {
  loading: false,
  error: null,
  username: null,
  password: null,
  provider: null,
  resetPassord: false,
  accountCreated: false,
  accountValidation: null,
};

export default createReducer(initialState, {
  [AUTH_SIGNIN + FETCH_REQUEST]: (state, { provider, username, password }) => {
    let newState;
    if (provider) {
      newState = {
        ...state,
        [provider]: {
          loading: true,
          error: null,
        },
      };
    } else {
      newState = {
        ...state,
        loading: true,
        error: null,
      };
    }

    return {
      ...newState,
      password,
      provider,
      username,
    };
  },
  [AUTH_SIGNIN + FETCH_SUCCESS]: (state, { provider }) => {
    if (provider) {
      return {
        ...state,
        [provider]: {
          loading: false,
          error: null,
        },
      };
    }

    return {
      ...state,
      loading: false,
      error: null,
    };
  },
  [AUTH_SIGNIN + FETCH_FAILURE]: (state, { provider, error }) => {
    if (provider) {
      return {
        ...state,
        [provider]: {
          loading: false,
          error,
        },
      };
    }

    return {
      ...state,
      loading: false,
      error,
    };
  },

  [AUTH_SIGNOUT + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_SIGNOUT + FETCH_SUCCESS]: () => ({
    ...initialState,
  }),
  [AUTH_SIGNOUT + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [AUTH_SIGNUP + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
    accountCreated: false,
  }),
  [AUTH_SIGNUP + FETCH_SUCCESS]: (state, { provider, validation }) => {
    if (provider) {
      return {
        ...state,
        [provider]: {
          loading: false,
          error: null,
          accountCreated: true,
          accountValidation: validation || "none",
        },
      };
    }

    return {
      ...state,
      loading: false,
      error: null,
      accountCreated: true,
      accountValidation: validation || "none",
    };
  },
  [AUTH_SIGNUP + FETCH_FAILURE]: (state, { provider, error }) => {
    if (provider) {
      return {
        ...state,
        [provider]: {
          loading: false,
          error,
          accountCreated: false,
          accountValidation: null,
        },
      };
    }

    return {
      ...state,
      loading: false,
      error,
      accountCreated: false,
      accountValidation: null,
    };
  },

  [AUTH_ADMIN_CREATE_USER + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
    accountCreated: false,
  }),

  [AUTH_LOSTPASSWORD + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
    resetPassord: false,
  }),
  [AUTH_LOSTPASSWORD + FETCH_SUCCESS]: (state) => ({
    ...state,
    resetPassord: true,
  }),
  [AUTH_LOSTPASSWORD + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
    resetPassord: false,
  }),
});
