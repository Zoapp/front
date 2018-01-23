/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import { delay, eventChannel } from "redux-saga";
import { put /* , race, call, take, fork */ } from "redux-saga/effects";
import {
  API_USERPROFILE, API_ADMIN,
  API_SETADMINPARAMETERS,
  /* API_GETMIDDLEWARES, API_SETMIDDLEWARE, API_DELETEMIDDLEWARE,
  SUBSCRIBE, UNSUBSCRIBE, */
  FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
} from "../actions";
import { getWebService /* , createSocketService */ } from "../services";

const api = [
/* User */
  [API_USERPROFILE + FETCH_REQUEST,
    function* f() {
      try {
        const response = yield getWebService().get("me");
        yield put({ type: `${API_USERPROFILE}${FETCH_SUCCESS}`, loading: false, profile: response });
      } catch (error) {
        yield put({ type: `${API_USERPROFILE}${FETCH_FAILURE}`, error });
      }
    },
  ],
  /* Admin */
  [API_ADMIN + FETCH_REQUEST,
    function* f() {
      try {
        const response = yield getWebService().get("admin");
        yield put({ type: `${API_ADMIN}${FETCH_SUCCESS}`, loading: false, admin: response });
      } catch (error) {
        yield put({ type: `${API_ADMIN}${FETCH_FAILURE}`, error });
      }
    },
  ],
  [API_SETADMINPARAMETERS + FETCH_REQUEST,
    function* f(action) {
      try {
        const { params } = action;
        const response = yield getWebService().put("admin", params);
        yield put({ type: `${API_SETADMINPARAMETERS}${FETCH_SUCCESS}`, loading: false, params: response });
      } catch (error) {
        yield put({ type: `${API_SETADMINPARAMETERS}${FETCH_FAILURE}`, error });
      }
    },
  ],
];
export default api;
