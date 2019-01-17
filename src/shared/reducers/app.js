/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  API_ADMIN,
  API_ADMIN_UPDATE_PROFILE,
  API_SETADMINPARAMETERS,
  API_GETADMINPARAMETERS,
  APP_SETACTIVETAB,
  APP_SETPROPERTIES,
  APP_SETSCREEN,
  APP_SETPROJECT,
  AUTH_SIGNOUT,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  API_ADMIN_UPDATE,
  API_GETUSERS,
  API_GETPLUGINS,
} from "../actions/constants";

export const initialState = {
  admin: null,
  adminParameters: null,
  error: null,
  loading: false,
  activeScreen: {},
  activeTab: 0,
  project: {
    name: null,
    index: 0,
    color: null,
    backgroundColor: null,
    icon: null,
  },
  users: [],
  plugins: [],
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

  [API_ADMIN_UPDATE_PROFILE + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_ADMIN_UPDATE_PROFILE + FETCH_SUCCESS]: (state) => ({
    ...state,
    loading: false,
    error: null,
  }),
  [API_ADMIN_UPDATE_PROFILE + FETCH_FAILURE]: (state, { error }) => ({
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
  [APP_SETACTIVETAB]: (state, { activeTab }) => ({
    ...state,
    activeTab,
  }),
  [APP_SETPROPERTIES]: (state, { properties }) => ({
    ...state,
    ...properties,
  }),
  [APP_SETSCREEN]: (state, { screen }) => ({
    ...state,
    activeScreen: { ...screen },
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
  [API_GETPLUGINS + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_GETPLUGINS + FETCH_SUCCESS]: (state, { plugins }) => ({
    ...state,
    plugins,
    loading: false,
  }),
  [API_GETPLUGINS + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
};

export default createReducer(initialState, handlers);
