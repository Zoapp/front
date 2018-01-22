/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  API_USERPROFILE,
  FETCH_REQUEST,
} from "./";

export function apiUserProfileRequest() {
  return { type: API_USERPROFILE + FETCH_REQUEST };
}

export function apiSaveUserProfileRequest() {
  return { type: API_USERPROFILE + FETCH_REQUEST };
}
