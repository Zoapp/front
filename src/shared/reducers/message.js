/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  API_ADMIN,
  API_ADMIN_UPDATE,
  API_SETADMINPARAMETERS,
  API_USERPROFILE,
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_CREATEUSER,
  AUTH_LOSTPASSWORD,
  MESSAGE_ADDMESSAGE,
  MESSAGE_REMOVEMESSAGE,
  FETCH_FAILURE,
  FETCH_INFO,
  FETCH_SUCCESS,
  API_GETADMINPARAMETERS,
  API_USERPROFILE_UPDATE,
  AUTH_RESETPASSWORD,
} from "../actions/constants";

export const addMessageToState = (state, { message: m, level }) => {
  const { messages } = state;
  let message = m;
  if (m.message) {
    ({ message } = m);
  }
  messages.push({
    message,
    level,
  });
  return {
    ...state,
    messages,
  };
};

export const addErrorToState = (state, { error }) =>
  addMessageToState(state, { message: error, level: "error" });

export const addInfoToState = (state, { info }) =>
  addMessageToState(state, { message: info, level: "info" });

export const initialState = {
  messages: [],
};

export const handlers = {
  /* App section */
  [API_ADMIN + FETCH_FAILURE]: addErrorToState,
  [API_ADMIN_UPDATE + FETCH_FAILURE]: addErrorToState,
  [API_SETADMINPARAMETERS + FETCH_FAILURE]: addErrorToState,
  [API_GETADMINPARAMETERS + FETCH_FAILURE]: addErrorToState,

  /* Auth section */
  [AUTH_SIGNIN + FETCH_FAILURE]: addErrorToState,
  [AUTH_SIGNOUT + FETCH_FAILURE]: addErrorToState,
  [AUTH_CREATEUSER + FETCH_INFO]: addInfoToState,
  [AUTH_LOSTPASSWORD + FETCH_SUCCESS]: addInfoToState,
  [AUTH_RESETPASSWORD + FETCH_SUCCESS]: addInfoToState,

  /* User section */
  [API_USERPROFILE + FETCH_FAILURE]: addErrorToState,
  [API_USERPROFILE_UPDATE + FETCH_FAILURE]: addErrorToState,

  [MESSAGE_ADDMESSAGE]: addMessageToState,

  [MESSAGE_REMOVEMESSAGE]: (state) => {
    const { messages } = state;
    messages.shift();
    return {
      ...state,
      messages,
    };
  },
};

export default createReducer(initialState, handlers);
