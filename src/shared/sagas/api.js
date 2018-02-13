/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { put } from "redux-saga/effects";
import {
  API_ADMIN,
  API_SETADMINPARAMETERS,
  API_USERPROFILE,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions";
import { apiUserProfileSuccess, apiUserProfileError } from "../actions/user";
import { getWebService } from "../services";

const api = [
  /* User */
  [API_USERPROFILE + FETCH_REQUEST,
    function* f() {
      try {
        const response = yield getWebService().get("me");
        yield put(apiUserProfileSuccess({ profile: response }));
      } catch (error) {
        yield put(apiUserProfileError({ error }));
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
