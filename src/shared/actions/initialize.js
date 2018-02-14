/* eslint import/prefer-default-export:0 */
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AUTH_INIT_SETTINGS } from "./constants";

export function initAuthSettings(config) {
  return {
    type: AUTH_INIT_SETTINGS,
    config,
  };
}
