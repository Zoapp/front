/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import signoutMiddleware from "shared/middleware/signoutMiddleware";
import { FETCH_FAILURE } from "shared/actions/constants";

describe("signoutMiddleware", () => {
  it("does nothing if action is not a failure", () => {
    const store = {
      getState: jest.fn(() => ({
        user: {},
      })),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    const invoke = (action) => signoutMiddleware(store)(next)(action);

    const action = { type: "foo" };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(store.getState).not.toHaveBeenCalled();
  });

  it("does nothin if action is failure but without response", () => {
    const store = {
      getState: jest.fn(),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    const invoke = (action) => signoutMiddleware(store)(next)(action);

    const action = { type: `foo${FETCH_FAILURE}` };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(store.getState).not.toHaveBeenCalled();
  });

  it("doest nothing if action is failure but not a 401 status code", () => {
    const store = {
      getState: jest.fn(),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    const invoke = (action) => signoutMiddleware(store)(next)(action);

    const action = {
      type: `foo${FETCH_FAILURE}`,
      error: {
        response: {
          status: 400,
        },
      },
    };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(store.getState).not.toHaveBeenCalled();
  });

  it("should signout if action is a failure and status code is 401", () => {
    const store = {
      getState: jest.fn(() => ({
        auth: {
          provider: "foo",
        },
        user: { isSignedIn: true },
      })),
      dispatch: jest.fn(),
    };

    const next = jest.fn();

    const invoke = (action) => signoutMiddleware(store)(next)(action);

    const action = {
      type: `foo${FETCH_FAILURE}`,
      error: {
        status: 401,
      },
    };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.getState).toHaveBeenCalled();
  });
});
