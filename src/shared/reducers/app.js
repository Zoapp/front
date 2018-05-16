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
  API_GETADMINPARAMETERS,
  APP_SETTITLE,
  AUTH_SIGNOUT,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions/constants";

export const initialState = {
  admin: null,
  adminParameters: null,
  error: null,
  loading: false,
  titleName: "",
};

export const handlers = {
  /* API section */
  [API_ADMIN + FETCH_REQUEST]: (state) => ({
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

  [API_SETADMINPARAMETERS + FETCH_REQUEST]: (state) => ({
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
    loading: false,
    error: null,
  }),
  [API_SETADMINPARAMETERS + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [API_GETADMINPARAMETERS + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_GETADMINPARAMETERS + FETCH_SUCCESS]: (state, adminParameters) => ({
    ...state,
    loading: false,
    error: null,
    adminParameters,
  }),
  [API_GETADMINPARAMETERS + FETCH_FAILURE]: (state, error) => ({
    ...state,
    adminParameters: null,
    loading: false,
    error,
  }),

  /* APP section */
  [APP_SETTITLE]: (state, { titleName }) => ({
    ...state,
    titleName,
  }),

  /* Auth section */
  [AUTH_SIGNOUT + FETCH_SUCCESS]: (state) => ({
    ...state,
    ...initialState,
  }),
};

export default createReducer(initialState, handlers);
