/* eslint import/prefer-default-export: 0 */
/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APP_SETPROPERTIES, APP_SETSCREEN, APP_SETPROJECT } from "./constants";

export function appSetProperties(properties) {
  return {
    type: APP_SETPROPERTIES,
    properties,
  };
}

export function appSetTitleName(title, name = title) {
  const screen = { title, name };
  return {
    type: APP_SETSCREEN,
    screen,
  };
}

export function appSetScreen(screen) {
  return {
    type: APP_SETSCREEN,
    screen,
  };
}

export function appSetProject(project) {
  return {
    type: APP_SETPROJECT,
    project,
  };
}
