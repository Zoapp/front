/* eslint import/prefer-default-export: 0 */
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MESSAGE_SETMESSAGE, MESSAGE_REMOVEMESSAGE } from "./constants";

export function setMessage(message) {
  return {
    type: MESSAGE_SETMESSAGE,
    message,
  };
}

export function removeMessage() {
  return {
    type: MESSAGE_REMOVEMESSAGE,
  };
}
