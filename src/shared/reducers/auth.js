/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  AUTH_LOAD_INITIAL_STATE,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_SIGNUP,
  AUTH_LOSTPASSWORD,
  AUTH_CREATEUSER,
  AUTH_UPDATE_STATE,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_INFO,
  AUTH_RESETPASSWORD,
} from "../actions/constants";

export const initialState = {
  loading: false,
  newUserLoading: false,
  resetPasswordLoading: false,
  error: null,
  resetPasswordError: null,
  username: null,
  password: null,
  provider: null,
  resetPassord: false,
  accountCreated: false,
  accountValidation: null,
};

export default createReducer(initialState, {
  [AUTH_LOAD_INITIAL_STATE]: () => ({
    ...initialState,
  }),
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

  [AUTH_CREATEUSER + FETCH_REQUEST]: (state) => ({
    ...state,
    newUserLoading: true,
    error: null,
  }),
  [AUTH_CREATEUSER + FETCH_SUCCESS]: (state) => ({
    ...state,
    newUserLoading: false,
    error: null,
  }),
  [AUTH_CREATEUSER + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    newUserLoading: false,
    error,
  }),
  [AUTH_CREATEUSER + FETCH_INFO]: (state) => ({
    ...state,
    newUserLoading: false,
    loading: false,
    error: null,
  }),

  [AUTH_LOSTPASSWORD + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_LOSTPASSWORD + FETCH_SUCCESS]: (state) => ({
    ...state,
    loading: false,
  }),
  [AUTH_LOSTPASSWORD + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [AUTH_RESETPASSWORD + FETCH_REQUEST]: (state) => ({
    ...state,
    resetPasswordLoading: true,
    resetPasswordError: null,
  }),
  [AUTH_RESETPASSWORD + FETCH_SUCCESS]: (state) => ({
    ...state,
    resetPasswordLoading: false,
  }),
  [AUTH_RESETPASSWORD + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    resetPasswordLoading: false,
    resetPasswordError: error,
  }),

  [AUTH_UPDATE_STATE + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_UPDATE_STATE + FETCH_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [AUTH_UPDATE_STATE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
});
