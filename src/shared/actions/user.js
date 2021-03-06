/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_USERPROFILE,
  API_CREATEUSERPROFILE,
  API_USERPROFILE_UPDATE,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "./constants";

export function apiUserProfileRequest() {
  return { type: API_USERPROFILE + FETCH_REQUEST };
}

export function apiUserProfileSuccess({ profile }) {
  return {
    type: API_USERPROFILE + FETCH_SUCCESS,
    profile,
  };
}

export function apiUserProfileError({ error }) {
  return {
    type: API_USERPROFILE + FETCH_FAILURE,
    error,
  };
}

export function apiCreateUserProfileRequest({ userId }) {
  return { type: API_CREATEUSERPROFILE + FETCH_REQUEST, userId };
}

export function apiCreateUserProfileSuccess() {
  return { type: API_CREATEUSERPROFILE + FETCH_SUCCESS };
}

export function apiUserProfileUpdateRequest(params) {
  return { type: API_USERPROFILE_UPDATE + FETCH_REQUEST, params };
}

export function apiUserProfileUpdateSuccess({ profile }) {
  return { type: API_USERPROFILE_UPDATE + FETCH_SUCCESS, profile };
}

export function apiUserProfileUpdateError({ error }) {
  return { type: API_USERPROFILE_UPDATE + FETCH_FAILURE, error };
}
