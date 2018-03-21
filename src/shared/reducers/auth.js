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
});
