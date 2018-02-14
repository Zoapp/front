/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers } from "redux";

import initialize from "./initialize";
import auth from "./auth";
import user from "./user";
import app from "./app";

export default combineReducers({
  initialize,
  auth,
  user,
  app,
});
