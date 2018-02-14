/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import {
  APP_SETTITLE, API_ADMIN, API_SETADMINPARAMETERS,
  API_GETMIDDLEWARES, API_SETMIDDLEWARE, API_DELETEMIDDLEWARE,
  AUTH_SIGNOUT,
  FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
} from "../actions";

const initialState = {
  loading: false,
  admin: null,
  titleName: "",
  error: null,
};

export default createReducer(initialState, {
  /* API section */
  [API_ADMIN + FETCH_REQUEST]: state => ({ ...state, loading: true, error: null }),
  [API_ADMIN + FETCH_SUCCESS]: (state, { admin }) => ({
    ...state, loading: false, error: null, admin: { ...admin },
  }),
  [API_ADMIN + FETCH_FAILURE]: (state, { error }) => ({ ...state, loading: false, error }),

  [API_SETADMINPARAMETERS + FETCH_REQUEST]: state => ({ ...state, loading: true, error: null }),
  [API_SETADMINPARAMETERS + FETCH_SUCCESS]: (state, { params }) => {
    const admin = { ...state.admin };
    admin.params = { ...params };
    return {
      ...state, loading: false, error: null, admin,
    };
  },
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
    middlewares: [...middlewares],
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
  [API_SETMIDDLEWARE + FETCH_FAILURE]: (state, { error }) => ({ ...state, loading: false, error }),

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
      ...state, loading: false, error: null, middlewares,
    };
  },
  [API_DELETEMIDDLEWARE + FETCH_FAILURE]: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),

  /* APP section */
  [APP_SETTITLE]: (state, { titleName }) => ({ ...state, titleName }),

  /* Auth section */
  [AUTH_SIGNOUT + FETCH_SUCCESS]: state => ({ ...state, ...initialState }),
});
