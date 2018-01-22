/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_ADMIN, API_SETADMINPARAMETERS,
  API_GETMIDDLEWARES, API_SETMIDDLEWARE, API_DELETEMIDDLEWARE,
  FETCH_REQUEST,
} from "./";

export function apiAdminRequest() {
  return { type: API_ADMIN + FETCH_REQUEST };
}

export function apiSetAdminParametersRequest(params) {
  return { type: API_SETADMINPARAMETERS + FETCH_REQUEST, params };
}

export function apiGetMiddlewaresRequest(botId, middlewareType = null) {
  return { type: API_GETMIDDLEWARES + FETCH_REQUEST, botId, middlewareType };
}

export function apiSetMiddlewareRequest(botId, middleware) {
  return { type: API_SETMIDDLEWARE + FETCH_REQUEST, botId, middleware };
}

export function apiDeleteMiddlewareRequest(botId, middlewareId) {
  return { type: API_DELETEMIDDLEWARE + FETCH_REQUEST, botId, middlewareId };
}
