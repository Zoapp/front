/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { DialogManager } from "zoapp-ui";

import configureStore from "./store";
import App from "./containers/app";
import { initServices } from "./services";

export default class Client {
  constructor(tagId, appProperties, appConfig, reducers = {}, sagas = {}) {
    this.appProperties = appProperties;
    this.reducers = reducers;
    this.sagas = sagas;
    this.store = configureStore(reducers, sagas, { app: appProperties });
    DialogManager.init(this.store);
    initServices(appConfig);
    this.mountNode = document.getElementById(tagId);
  }

  renderApp = (Root) => {
    render(
      <AppContainer warnings={false}>
        <Provider store={this.store}>
          <BrowserRouter>
            <Root store={this.store} props={this.appProperties} />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      this.mountNode,
    );
  };

  start() {
    /* global module */
    if (module.hot) {
      /* eslint-disable global-require */
      /* eslint-disable no-undef */
      // const rootPath = "./shared/container/app";
      module.hot.accept("./containers/app", () => {
        const newApp = require("./containers/app").default;
        this.renderApp(newApp);
      });
      /* eslint-enable no-undef */
      /* eslint-enable global-require */
    }
    this.renderApp(App);
  }
}
