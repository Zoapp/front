/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Front from "Zoapp/front";
import Screen from "Zoapp/containers/screen";
import AdminManager from "ZoappContainers/adminManager";
import Advanced from "ZoappContainers/admin/advanced";
import Users from "ZoappContainers/admin/users";
import DrawerFooter from "ZoappContainers/drawerFooter";
import Zrmc from "zrmc";
import config from "../../config/default.json";
import { setMessage } from "../shared/actions/message";
import { appSetProject } from "../shared/actions/app";

const handleAction = () => {
  Zrmc.showDialog({
    header: "Are you happy?",
    body: "Please check the left and right side of this element for fun.",
    actions: [{ name: "Cancel" }, { name: "Continue" }],
  });
};

const app = {
  name: "Zoapp",
  subname: "CE",
  instance: {
    name: "Dev",
    color: "#f05545",
    description: "A warning message",
  },
  version: "0.1.0",
  design: {
    minTitleName: true,
    drawer: {
      type: "persistent",
      themeDark: true,
      renderFooter: props => React.createElement(DrawerFooter, props),
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
      panels: ["Users", "Advanced"],
      render: props => <AdminManager {...props } tabs={
          [
            <Users key="users" />,
            <Advanced key="advanced" />,
          ]
      } />,
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
    {
      id: "5",
      isDrawerItem: true,
      name: "Report an issue",
      icon: "bug_report",
      href: "https://github.com/zoapp/front/issues",
      access: "all",
      render: props => React.createElement(Screen, props, "Help"),
    },
  ],
};
/* eslint-disable no-undef */
const env = process.env.APP;
/* eslint-enable no-undef */
const front = new Front("app", app, config, env);

front.start(true);
front.store.dispatch(appSetProject({ name: "Project", index: 0, icon: "./images/default.png" }));
front.store.dispatch(setMessage("Welcome Human !"));

/* global module */
if (module.hot) {
  module.hot.accept();
}
