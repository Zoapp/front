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
import { AppContainer } from "react-hot-loader";

import configureStore from "./store";
import App from "./containers/app";
import { initServices } from "./services";

export default class Front {
  constructor(tagId, appProperties, appConfig, { store, reducers = {}, sagas = {} } = { }) {
    this.appProperties = appProperties;

    if (store) {
      this.store = store;
    } else {
      this.store = configureStore(reducers, sagas, { app: appProperties });
    }
    initServices(appConfig);
    this.mountNode = document.getElementById(tagId);
  }

  renderApp = (Main) => {
    render(
      <AppContainer warnings={false}>
        <Provider store={this.store}>
          <BrowserRouter>
            <Main store={this.store} />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      this.mountNode,
    );
  };

  restart() {
    /* eslint-disable global-require */
    const defaultApp = require("./containers/app").default;
    /* eslint-enable global-require */
    this.renderApp(defaultApp);
  }

  start(hmd = false) {
    this.renderApp(App);

    /* global module */
    if (hmd && module.hot) {
      module.hot.accept("./containers/app", () => {
        this.restart();
      });
    }
  }
}
