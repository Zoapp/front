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
import { appSetProperties } from "./actions/app";

import configureStore from "./store";
import App from "./containers/app";
import { initServices } from "./services";

export default class Front {
  static combinePropsEnv(properties, appEnv) {
    const appProperties = { ...properties };
    if (appEnv) {
      if (appEnv.subname) {
        appProperties.subname = appEnv.subname;
      }
      if (appEnv.version) {
        appProperties.version = appEnv.version;
      }
      if (appEnv.build) {
        appProperties.build = appEnv.build;
      }
      if (appEnv.instance) {
        if (!appProperties.instance) {
          appProperties.instance = {};
        }
        if (appEnv.instance.name) {
          appProperties.instance.name = appEnv.instance.name;
        }
        if (appEnv.instance.color) {
          appProperties.instance.color = appEnv.instance.color;
        }
        if (appEnv.instance.description) {
          appProperties.instance.description = appEnv.instance.description;
        }
      }
    }
    return appProperties;
  }

  constructor(
    tagId,
    appProperties,
    appConfig,
    appEnv,
    { store, reducers = {}, sagas = {} } = {},
  ) {
    this.appProperties = Front.combinePropsEnv(appProperties, appEnv);
    this.appProperties.configuration = appConfig;
    if (store) {
      this.store = store;
    } else {
      this.store = configureStore(reducers, sagas);
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
    this.store.dispatch(appSetProperties(this.appProperties));
    this.renderApp(App);
  }
}
