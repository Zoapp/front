/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import createReducer from "./createReducer";
import { AUTH_INIT_SETTINGS } from "../actions/constants";

export const initialState = {};

export default createReducer(initialState, {
  [AUTH_INIT_SETTINGS]: (state, { config }) => ({
    ...config,
  }),
});
