/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Zrmc, { TextField } from "zrmc";

const displayWebServiceEditor = (
  title,
  action,
  actionDef,
  parameters,
  setInput,
  onEditAction,
  className,
) => {
  const name = parameters.name ? parameters.name : "";
  const url = parameters.url ? parameters.url : "";
  let classes = parameters.classes ? parameters.classes : "";
  const secret = parameters.secret ? parameters.secret : "";

  if (classes instanceof Array) {
    classes = classes.join(",");
  }

  const content = (
    <div>
      <TextField
        defaultValue={name}
        pattern=".+"
        label="Name"
        error="Wrong value"
        style={{ width: "100%" }}
        ref={(input) => setInput(input, "name")}
      />
      <TextField
        defaultValue={url}
        pattern=".+"
        label="Url"
        error="Wrong value"
        style={{ width: "100%" }}
        ref={(input) => setInput(input, "url")}
      />
      <TextField
        defaultValue={secret}
        pattern=".+"
        label="Secret"
        error="Wrong value"
        style={{ width: "100%" }}
        ref={(input) => setInput(input, "secret")}
      />
      <TextField
        defaultValue={classes}
        pattern=".+"
        label="Classes"
        error="Wrong value"
        style={{ width: "100%" }}
        ref={(input) => setInput(input, "classes")}
      />
    </div>
  );

  Zrmc.showDialog({
    header: title,
    body: content,
    actions: [{ name: action }, { name: "Cancel" }],
    onAction: onEditAction,
    className,
  });
};

export default displayWebServiceEditor;
