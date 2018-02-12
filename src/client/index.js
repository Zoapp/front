/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Front from "Zoapp/front";
import Screen from "Zoapp/containers/screen";
import config from "../../config/default.json";

const app = {
  name: "Zoapp",
  version: "0.1.0",
  design: {
    drawer: {
      type: "persistent",
      themeDark: true,
    },
  },
  screens: [
    {
      id: "1",
      to: "/",
      icon: "dashboard",
      name: "Dashboard",
      access: "auth",
      path: "/",
      panels: ["Panel 1", "Panel 2"],
      toolbox: ["todo"],
      render: (props) => { return React.createElement(Screen, props, "Dashboard"); },
    },
    {
      id: "2",
      to: "/admin",
      icon: "settings",
      name: "Admin",
      path: "/admin",
      access: "auth",
      panels: ["General", "Extensions", "Users", "Advanced"],
      render: (props) => { return React.createElement(Screen, props, "Admin"); },
    },
    {
      id: "3",
      to: "/",
      icon: "home",
      name: "Home",
      path: "*",
      access: "public",
      render: (props) => { return React.createElement(Screen, props, "Home"); },
    },
    {
      id: "4",
      to: "/help",
      name: "Help",
      icon: "help",
      path: "/help",
      access: "all",
      render: (props) => { return React.createElement(Screen, props, "Help"); },
    },
  ],
};

const front = new Front("app", app, config);

front.start();
