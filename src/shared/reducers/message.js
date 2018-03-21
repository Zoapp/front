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
  API_USERPROFILE,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  MESSAGE_SETMESSAGE,
  MESSAGE_REMOVEMESSAGE,
  FETCH_FAILURE,
} from "../actions/constants";

export const addErrorToState = (state, { error }) => ({
  ...state,
  message: error,
});

export const initialState = {
  message: null,
};

export const handlers = {
  /* App section */
  [API_ADMIN + FETCH_FAILURE]: addErrorToState,
  [API_SETADMINPARAMETERS + FETCH_FAILURE]: addErrorToState,

  /* Auth section */
  [AUTH_SIGNIN + FETCH_FAILURE]: addErrorToState,
  [AUTH_SIGNOUT + FETCH_FAILURE]: addErrorToState,

  /* User section */
  [API_USERPROFILE + FETCH_FAILURE]: addErrorToState,

  [MESSAGE_SETMESSAGE]: (state, { message }) => ({
    ...state,
    message,
  }),

  [MESSAGE_REMOVEMESSAGE]: (state) => ({
    ...state,
    message: null,
  }),
};

export default createReducer(initialState, handlers);
