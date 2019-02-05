/* eslint import/prefer-default-export: 0 */
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MESSAGE_ADDMESSAGE, MESSAGE_REMOVEMESSAGE } from "./constants";

export function addMessage(message, level) {
  return {
    type: MESSAGE_ADDMESSAGE,
    message,
    level,
  };
}

export function removeMessage() {
  return { type: MESSAGE_REMOVEMESSAGE };
}
