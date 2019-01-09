/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  AUTH_SIGNIN,
  API_USERPROFILE,
  API_USERPROFILE_UPDATE,
  FETCH_SUCCESS,
  FETCH_REQUEST,
  FETCH_FAILURE,
  AUTH_SIGNOUT,
} from "../actions/constants";

export const initialState = {
  attributes: null,
  isSignedIn: false,
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [AUTH_SIGNIN + FETCH_SUCCESS]: (state, { attributes }) => ({
    attributes,
    error: null,
    isSignedIn: true,
    loading: false,
  }),
  [AUTH_SIGNOUT + FETCH_SUCCESS]: () => ({
    ...initialState,
  }),
  [API_USERPROFILE + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_USERPROFILE + FETCH_SUCCESS]: (state, { profile }) => ({
    ...state,
    error: null,
    loading: false,
    profile,
  }),
  [API_USERPROFILE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  [API_USERPROFILE_UPDATE + FETCH_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [API_USERPROFILE_UPDATE + FETCH_SUCCESS]: (state, { profile }) => ({
    ...state,
    error: null,
    loading: false,
    profile: { ...profile },
  }),
  [API_USERPROFILE_UPDATE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
});
