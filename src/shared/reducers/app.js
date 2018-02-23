/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  API_ADMIN,
  API_SETADMINPARAMETERS,
  APP_SETTITLE,
  APP_SETMESSAGE,
  APP_REMOVEMESSAGE,
  AUTH_SIGNOUT,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions/constants";

export const initialState = {
  admin: null,
  error: null,
  loading: false,
  titleName: "",
};

export default createReducer(initialState, {
  /* API section */
  [API_ADMIN + FETCH_REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_ADMIN + FETCH_SUCCESS]: (state, { admin }) => ({
    ...state,
    loading: false,
    error: null,
    admin,
  }),
  [API_ADMIN + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [API_SETADMINPARAMETERS + FETCH_REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_SETADMINPARAMETERS + FETCH_SUCCESS]: (state, { params }) => ({
    ...state,
    admin: {
      ...state.admin,
      params,
    },
  }),
  [API_SETADMINPARAMETERS + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  /* APP section */
  [APP_SETTITLE]: (state, { titleName }) => ({
    ...state,
    titleName,
  }),

  [APP_SETMESSAGE]: (state, { message }) => ({
    ...state,
    message,
  }),

  [APP_REMOVEMESSAGE]: state => ({
    ...state,
    message: null,
  }),

  /* Auth section */
  [AUTH_SIGNOUT + FETCH_SUCCESS]: state => ({
    ...state, ...initialState,
  }),
});
