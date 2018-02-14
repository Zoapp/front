/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_ADMIN,
  API_DELETEMIDDLEWARE,
  API_GETMIDDLEWARE,
  API_SETADMINPARAMETERS,
  API_SETMIDDLEWARE,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "./constants";

export function apiAdminRequest() {
  return { type: API_ADMIN + FETCH_REQUEST };
}

export function apiAdminSuccess({ admin }) {
  return { type: API_ADMIN + FETCH_SUCCESS, admin };
}

export function apiAdminError({ error }) {
  return { type: API_ADMIN + FETCH_FAILURE, error };
}

export function apiSetAdminParametersRequest(params) {
  return {
    type: API_SETADMINPARAMETERS + FETCH_REQUEST,
    params,
  };
}

export function apiSetAdminParametersSuccess({ params }) {
  return {
    type: API_SETADMINPARAMETERS + FETCH_SUCCESS,
    params,
  };
}

export function apiSetAdminParametersError({ error }) {
  return {
    type: API_SETADMINPARAMETERS + FETCH_FAILURE,
    error,
  };
}
