/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { assert } from "chai";
import { DialogManager } from "zoapp-ui";

describe("Components", () => {
  it("DialogManager", () => {
    DialogManager.init();
    assert.isObject(DialogManager, "DialogManager is null");
  });
});
