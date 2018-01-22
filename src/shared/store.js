/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

/* global window */
export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers, initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  /* eslint-enable no-underscore-dangle */

  /* global module */
  /* eslint-disable global-require */
  /* eslint-disable no-undef */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      // console.log("HMR reducers");
      store.replaceReducer(require("./reducers").default);
    });
    module.hot.accept("./sagas", () => {
      // console.log("HMR sagas TODO");
      // TODO reload Sagas
      // @see https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
      // SagaManager.cancelSagas(store);
      // require("./sagas").default.startSagas(sagaMiddleware);
    });
  }
  /* eslint-enable no-undef */
  /* eslint-enable global-require */

  return store;
}
