/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { takeEvery, all } from "redux-saga/effects";

import auth from "./auth";
import api from "./api";

function takeAll(subRoot) {
  const takeList = [];

  subRoot.forEach((sub) => {
    takeList.push(takeEvery(sub[0], sub[1]));
  });

  return takeList;
}

export default function* root() {
  yield all(takeAll(auth));
  yield all(takeAll(api));
}
