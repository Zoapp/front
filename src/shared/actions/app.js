/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP_SETTITLE, APP_SETNAME } from "./";

export function appSetTitle(titleName) {
  return {
    type: APP_SETTITLE,
    titleName,
  };
}

export function appSetName(appName) {
  return {
    type: APP_SETNAME,
    appName,
  };
}
