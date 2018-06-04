/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store";
import App from "./containers/app";
import { initServices } from "./services";

export default class Front {
  constructor(
    tagId,
    appProperties,
    appConfig,
    appEnv,
    { store, reducers = {}, sagas = {} } = {},
  ) {
    this.appProperties = { ...appProperties };
    if (appEnv) {
      if (appEnv.subname) {
        this.appProperties.subname = appEnv.subname;
      }
      if (appEnv.version) {
        this.appProperties.version = appEnv.version;
      }
      if (appEnv.build) {
        this.appProperties.build = appEnv.build;
      }
      if (appEnv.instance) {
        if (!this.appProperties.instance) {
          this.appProperties.instance = {};
        }
        if (appEnv.instance.name) {
          this.appProperties.instance.name = appEnv.instance.name;
        }
        if (appEnv.instance.color) {
          this.appProperties.instance.color = appEnv.instance.color;
        }
        if (appEnv.instance.description) {
          this.appProperties.instance.description = appEnv.instance.description;
        }
      }
    }
    if (store) {
      this.store = store;
    } else {
      this.store = configureStore(reducers, sagas, { app: this.appProperties });
    }

    initServices(appConfig);

    this.mountNode = document.getElementById(tagId);
  }

  renderApp = (Main) => {
    render(
      <Provider store={this.store}>
        <BrowserRouter>
          <Main store={this.store} />
        </BrowserRouter>
      </Provider>,
      this.mountNode,
    );
  };

  restart() {
    this.renderApp(App);
  }

  start() {
    this.renderApp(App);
  }
}
