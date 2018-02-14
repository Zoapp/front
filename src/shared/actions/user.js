/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_USERPROFILE,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "./";

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
