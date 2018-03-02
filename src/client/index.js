/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Front from "Zoapp/front";
import Screen from "Zoapp/containers/screen";
import Zrmc from "zrmc";
import config from "../../config/default.json";
import { appSetMessage } from "../shared/actions/app";

const handleAction = () => {
  Zrmc.showDialog({
    header: "Are you happy?",
    body: "Please check the left and right side of this element for fun.",
    actions: [{ name: "Cancel" }, { name: "Continue" }],
  });
};

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
      isDrawerItem: true,
      icon: "dashboard",
      name: "Dashboard",
      access: "auth",
      path: "/",
      panels: ["Panel 1", "Panel 2"],
      toolbox: [{ title: "todo", onAction: handleAction }],
      fab: { icon: "favorite", onAction: handleAction },
      render: props => React.createElement(Screen, props, "Dashboard"),
    },
    {
      id: "2",
      isDrawerItem: true,
      icon: "settings",
      name: "Admin",
      path: "/admin",
      access: "auth",
      panels: ["General", "Extensions", "Users", "Advanced"],
      render: props => React.createElement(Screen, props, "Admin"),
    },
    {
      id: "3",
      isDrawerItem: true,
      icon: "home",
      name: "Home",
      path: "*",
      access: "public",
      render: props => React.createElement(Screen, props, "Home"),
    },
    {
      id: "4",
      isDrawerItem: true,
      name: "Help",
      icon: "help",
      path: "/help",
      access: "all",
      render: props => React.createElement(Screen, props, "Help"),
    },
  ],
};

const front = new Front("app", app, config);

front.start(true);
front.store.dispatch(appSetMessage({ message: "Welcome Dude !" }));

/* global module */
if (module.hot) {
  module.hot.accept();
}
