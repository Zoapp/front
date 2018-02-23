/* eslint import/prefer-default-export: 0 */
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP_SETTITLE, APP_SETMESSAGE, APP_REMOVEMESSAGE } from "./constants";

export function appSetTitle(titleName) {
  return {
    type: APP_SETTITLE,
    titleName,
  };
}

export function appSetMessage(message) {
  return {
    type: APP_SETMESSAGE,
    message,
  };
}

export function appRemoveLastMessage() {
  return {
    type: APP_REMOVEMESSAGE,
  };
}
