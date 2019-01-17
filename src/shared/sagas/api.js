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
  API_USERPROFILE_UPDATE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  API_GETADMINPARAMETERS,
  API_ADMIN_UPDATE,
  API_GETUSERS,
  API_GETPLUGINS,
  API_SETPLUGIN,
  API_DELETEPLUGIN,
} from "../actions/constants";
import {
  apiAdminError,
  apiAdminSuccess,
  apiAdminUpdateError,
  apiAdminUpdateSuccess,
  apiGetAdminParametersFailure,
  apiGetAdminParametersSuccess,
  apiGetUsersFailure,
  apiGetUsersSuccess,
  apiSetAdminParametersError,
  apiSetAdminParametersSuccess,
  apiSetPluginError,
  apiSetPluginSuccess,
  apiGetPluginsRequest,
} from "../actions/api";
import {
  apiUserProfileError,
  apiUserProfileSuccess,
  apiCreateUserProfileRequest,
  apiCreateUserProfileSuccess,
  apiUserProfileUpdateSuccess,
  apiUserProfileUpdateError,
} from "../actions/user";
import { getWebService } from "../services";

export function* createProfile({ userId }) {
  try {
    yield put(apiCreateUserProfileRequest({ userId }));
    const profile = yield getWebService().post("users", { userId });
    yield put(apiCreateUserProfileSuccess());
    return profile;
  } catch (error) {
    yield put(apiUserProfileError({ error }));
    return { error };
  }
}

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
  [
    API_USERPROFILE_UPDATE + FETCH_REQUEST,
    function* f({ params }) {
      try {
        const response = yield getWebService().put("me", params);
        yield put(apiUserProfileUpdateSuccess({ profile: response }));
      } catch (error) {
        if (error.response) {
          const response = yield error.response.json();
          yield put(apiUserProfileUpdateError({ error: response.error }));
        } else {
          yield put(apiUserProfileUpdateError({ error }));
        }
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
  /* Plugins */
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
  [
    API_SETPLUGIN + FETCH_REQUEST,
    function* f(action) {
      try {
        const { plugin, botId } = action;
        const response = yield getWebService().post("plugins/", plugin);
        yield put(apiSetPluginSuccess(response));
        yield put(apiGetPluginsRequest(botId));
      } catch (error) {
        yield put(apiSetPluginError({ error }));
      }
    },
  ],
  [
    API_DELETEPLUGIN + FETCH_REQUEST,
    function* f(action) {
      const { plugin, botId } = action;
      let url = "plugins/";
      if (plugin.middleware && plugin.middleware.id) {
        url += `?middlewareId=${plugin.middleware.id}`;
      }
      try {
        const result = yield getWebService().delete(url);
        if (result.error) {
          throw result;
        }
        yield put(apiGetPluginsRequest(botId));
      } catch (error) {
        yield put({ type: `${API_DELETEPLUGIN}${FETCH_FAILURE}`, error });
      }
    },
  ],
];
export default api;
