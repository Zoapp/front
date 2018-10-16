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
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  API_GETADMINPARAMETERS,
  API_ADMIN_UPDATE,
  API_GETUSERS,
  API_GETPLUGINS,
} from "../actions/constants";
import {
  apiAdminError,
  apiAdminSuccess,
  apiSetAdminParametersError,
  apiSetAdminParametersSuccess,
  apiGetAdminParametersSuccess,
  apiGetAdminParametersFailure,
  apiAdminUpdateSuccess,
  apiAdminUpdateError,
  apiGetUsersSuccess,
  apiGetUsersFailure,
} from "../actions/api";
import { apiUserProfileError, apiUserProfileSuccess } from "../actions/user";
import { getWebService } from "../services";

const api = [
  /* User */
  [
    API_USERPROFILE + FETCH_REQUEST,
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
  [
    API_ADMIN + FETCH_REQUEST,
    function* f() {
      try {
        const response = yield getWebService().get("admin");
        yield put(apiAdminSuccess({ admin: response }));
      } catch (error) {
        yield put(apiAdminError({ error }));
      }
    },
  ],
  [
    API_ADMIN_UPDATE + FETCH_REQUEST,
    function* f({ params }) {
      try {
        const response = yield getWebService().put("admin", params);
        yield put(apiAdminUpdateSuccess({ admin: response }));
      } catch (error) {
        yield put(apiAdminUpdateError({ error }));
      }
    },
  ],
  [
    API_SETADMINPARAMETERS + FETCH_REQUEST,
    function* f(action) {
      try {
        const { params } = action;
        const response = yield getWebService().put("admin", params);
        yield put(apiSetAdminParametersSuccess({ params: response }));
      } catch (error) {
        yield put(apiSetAdminParametersError({ error }));
      }
    },
  ],
  [
    API_GETADMINPARAMETERS + FETCH_REQUEST,
    function* f(action) {
      const { name, parameterType } = action;
      try {
        let response;
        if (parameterType === null) {
          response = yield getWebService().get(`params/${name}`);
        } else {
          response = yield getWebService().get(
            `params/${name}/${parameterType}`,
          );
        }

        yield put(apiGetAdminParametersSuccess(response));
      } catch (error) {
        yield put(apiGetAdminParametersFailure(error));
      }
    },
  ],
  [
    API_GETUSERS + FETCH_REQUEST,
    function* f() {
      try {
        const response = yield getWebService().get("users");
        yield put(apiGetUsersSuccess(response));
      } catch (error) {
        yield put(apiGetUsersFailure(error));
      }
    },
  ],
  /* Get plugins */
  [
    API_GETPLUGINS + FETCH_REQUEST,
    function* f(action) {
      const { botId } = action;
      let url = "plugins/";
      if (botId) {
        url += botId;
      }
      if (action.pluginType) {
        url += `?type=${action.pluginType}`;
      }
      try {
        const plugins = yield getWebService().get(url);
        yield put({
          type: `${API_GETPLUGINS}${FETCH_SUCCESS}`,
          loading: false,
          plugins,
        });
      } catch (error) {
        yield put({ type: `${API_GETPLUGINS}${FETCH_FAILURE}`, error });
      }
    },
  ],
];
export default api;
