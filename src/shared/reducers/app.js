/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  API_ADMIN,
  API_DELETEMIDDLEWARE,
  API_GETMIDDLEWARES,
  API_SETADMINPARAMETERS,
  API_SETMIDDLEWARE,
  APP_SETTITLE,
  AUTH_SIGNOUT,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions";

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

  [API_GETMIDDLEWARES + FETCH_REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
    lastMiddleware: null,
  }),
  [API_GETMIDDLEWARES + FETCH_SUCCESS]: (state, { middlewares }) => ({
    ...state,
    loading: false,
    error: null,
    middlewares,
  }),
  [API_GETMIDDLEWARES + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [API_SETMIDDLEWARE + FETCH_REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
    lastMiddleware: null,
  }),
  [API_SETMIDDLEWARE + FETCH_SUCCESS]: (state, { middleware }) => {
    const middlewares = [];

    let v = true;
    state.middlewares.forEach((m) => {
      if (m.id === middleware.id) {
        middlewares.push({ ...middleware });
        v = false;
      } else {
        middlewares.push(m);
      }
    });

    if (v) {
      middlewares.push({ ...middleware });
    }

    return {
      ...state,
      loading: false,
      error: null,
      middlewares,
      lastMiddleware: { ...middleware },
    };
  },
  [API_SETMIDDLEWARE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  [API_DELETEMIDDLEWARE + FETCH_REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
    lastMiddleware: null,
  }),
  [API_DELETEMIDDLEWARE + FETCH_SUCCESS]: (state, { middlewareId }) => {
    const middlewares = [];
    state.middlewares.forEach((m) => {
      if (m.id !== middlewareId) {
        middlewares.push(m);
      }
    });

    return {
      ...state,
      loading: false,
      error: null,
      middlewares,
    };
  },
  [API_DELETEMIDDLEWARE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  /* APP section */
  [APP_SETTITLE]: (state, { titleName }) => ({
    ...state,
    titleName,
  }),

  /* Auth section */
  [AUTH_SIGNOUT + FETCH_SUCCESS]: () => ({
    ...initialState,
  }),
});
