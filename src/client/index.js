/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Client from "Zoapp/client";
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
      id: "1", to: "/", icon: "dashboard", name: "Dashboard", access: "auth",
    },
    {
      id: "2", to: "/admin", icon: "settings", name: "Admin", path: "/admin", access: "auth",
    },
    {
      id: "3", to: "/", icon: "home", name: "Home", path: "*", access: "public",
    },
    {
      id: "4", to: "/", name: "Help", icon: "help", access: "all",
    },
  ],
};

const client = new Client("app", app, config);

client.start();
