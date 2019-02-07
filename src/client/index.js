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
import Settings from "ZoappContainers/settingsManager";
import Team from "ZoappContainers/admin/team";
import DrawerFooter from "ZoappContainers/drawerFooter";
import Zrmc from "zrmc";
import config from "../../config/default.json";
import { addMessage } from "../shared/actions/message";
import { appSetProject } from "../shared/actions/app";

const handleAction = () => {
  Zrmc.showDialog({
    header: "Are you happy?",
    body: "Please check the left and right side of this element for fun.",
    actions: [{ name: "Cancel" }, { name: "Continue" }],
  });
};

const DrawerFooterComponent = (props) =>
  React.createElement(DrawerFooter, props);
const DashboardComponent = (props) =>
  React.createElement(Screen, props, "Dashboard");
const AdminManagerComponent = (props) => (
  <AdminManager
    {...props}
    tabs={[<Team key="team" />, <Advanced key="advanced" />]}
  />
);
const HomeComponent = (props) => React.createElement(Screen, props, "Home");
const HelpComponent = (props) => React.createElement(Screen, props, "Help");
const SettingsComponent = (props) => <Settings {...props} />;

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
    toolbar: {
      theme: "white",
    },
    drawer: {
      type: "temporary",
      themeDark: true,
      renderFooter: DrawerFooterComponent,
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
      toolbox: [
        {
          title: "todo",
          onAction: handleAction,
          color: "var(--mdc-theme-text-primary-on-primary,#fff)",
          backgroundColor: "var(--mdc-theme-primary,#6200ee)",
        },
      ],
      fab: { icon: "favorite", onAction: handleAction },
      render: DashboardComponent,
    },
    {
      id: "2",
      isDrawerItem: true,
      icon: "settings",
      name: "Admin",
      path: "/admin",
      access: "auth",
      panels: ["Team", "Advanced"],
      render: AdminManagerComponent,
    },
    {
      id: "3",
      isDrawerItem: true,
      icon: "home",
      name: "Home",
      path: "*",
      access: "public",
      render: HomeComponent,
    },
    {
      id: "5",
      isDrawerItem: true,
      name: "Report an issue",
      icon: "bug_report",
      href: "https://github.com/zoapp/front/issues",
      access: "all",
      render: HelpComponent,
    },
    {
      id: "4",
      isDrawerItem: true,
      name: "Help",
      icon: "help",
      path: "/help",
      access: "all",
      render: HelpComponent,
    },
    {
      id: "6",
      icon: "settings",
      name: "Settings",
      access: "auth",
      path: "/settings",
      render: SettingsComponent,
    },
  ],
};
/* eslint-disable no-undef */
const env = process.env.APP;
/* eslint-enable no-undef */
const front = new Front("app", app, config, env);
front.start(true);
front.store.dispatch(
  appSetProject({ name: "Project", index: 0, icon: "./images/default.png" }),
);
front.store.dispatch(addMessage("Welcome Human !"));

/* global module */
if (module.hot) {
  module.hot.accept();
}
