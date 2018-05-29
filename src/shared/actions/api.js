/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_ADMIN,
  API_SETADMINPARAMETERS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  API_GETADMINPARAMETERS,
  API_ADMIN_UPDATE,
  API_GETUSERS,
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

export function apiAdminUpdateRequest(params) {
  return { type: API_ADMIN_UPDATE + FETCH_REQUEST, params };
}

export function apiAdminUpdateSuccess({ admin }) {
  return { type: API_ADMIN_UPDATE + FETCH_SUCCESS, admin };
}

export function apiAdminUpdateError({ error }) {
  return { type: API_ADMIN_UPDATE + FETCH_FAILURE, error };
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

export function apiGetAdminParametersRequest(name, parameterType = null) {
  return { type: API_GETADMINPARAMETERS + FETCH_REQUEST, name, parameterType };
}

export function apiGetAdminParametersSuccess(params) {
  return { type: API_GETADMINPARAMETERS + FETCH_SUCCESS, params };
}

export function apiGetAdminParametersFailure(error) {
  return { type: API_GETADMINPARAMETERS + FETCH_FAILURE, error };
}

export function apiGetUsersRequest() {
  return { type: API_GETUSERS + FETCH_REQUEST };
}

export function apiGetUsersSuccess(users) {
  return { type: API_GETUSERS + FETCH_SUCCESS, users };
}

export function apiGetUsersFailure(error) {
  return { type: API_GETUSERS + FETCH_FAILURE, error };
}
