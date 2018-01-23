/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Client from "./shared/client";

const app = {
  name: "Zoapp",
  title: "Zoapp",
  screens: [
    {
      id: "1", to: "/", icon: "home", name: "Home", path: "*", component: "home",
    },
    {
      id: "1", to: "/", icon: "dashboard", name: "Dashboard", path: "*", component: "dashboard", signIn: true,
    },
    {
      id: "2", to: "/", icon: "settings", name: "Admin", path: "/admin", component: "adminManager", signIn: true,
    },
    {
      id: "5", to: "/", name: "Help", icon: "help",
    },
  ],
};

const config = {
  backend: {
    secure: false,
    auth: {
      clientId: "4CMdlLmTxeLaYIgJamwvpikB7gYpgktgdiaBq6NzOoCcR6G77szIUUhfH6wYtWNc",
      clientSecret: "UuaBR4eehc3B6MRBC5T0zQ6uqfbLEMUj9YgcapLuqlx61ln86zP93qxBOeNiJuS1",
      path: "auth/",
    },
    api: {
      host: "localhost",
      port: 8081,
      path: "api/v1/",
    },
  },
};
const client = new Client("app", app, config);

client.start();
