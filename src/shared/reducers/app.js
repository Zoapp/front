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
  APP_SETPROJECT,
  AUTH_SIGNOUT,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  API_ADMIN_UPDATE,
  API_GETUSERS,
} from "../actions/constants";

export const initialState = {
  admin: null,
  adminParameters: null,
  error: null,
  loading: false,
  titleName: "",
  project: {
    name: "Project",
    index: 0,
    color: "white",
    backgroundColor: "#004040",
  },
  users: [],
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

  [API_ADMIN_UPDATE + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_ADMIN_UPDATE + FETCH_SUCCESS]: (state, { admin }) => ({
    ...state,
    loading: false,
    error: null,
    admin,
  }),
  [API_ADMIN_UPDATE + FETCH_FAILURE]: (state, { error }) => ({
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
  [API_GETADMINPARAMETERS + FETCH_SUCCESS]: (state, { params }) => ({
    ...state,
    loading: false,
    error: null,
    adminParameters: params,
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
  [APP_SETPROJECT]: (state, { project }) => ({
    ...state,
    project,
  }),
  /* Auth section */
  [AUTH_SIGNOUT + FETCH_SUCCESS]: (state) => ({
    ...state,
    ...initialState,
  }),
  [API_GETUSERS + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_GETUSERS + FETCH_SUCCESS]: (state, { users }) => ({
    ...state,
    loading: false,
    error: null,
    users,
  }),
  [API_GETUSERS + FETCH_FAILURE]: (state, error) => ({
    ...state,
    loading: false,
    error,
  }),
};

export default createReducer(initialState, handlers);
