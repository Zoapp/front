import * as actions from "shared/actions/app";
import * as apiActions from "shared/actions/api";
import * as authActions from "shared/actions/auth";
import reducer, { initialState } from "shared/reducers/app";

describe("reducers/app", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("requests the admin API", () => {
    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, apiActions.apiAdminRequest());
    expect(state).toEqual({
      ...prevState,
      loading: true,
      error: null,
    });
  });

  it("stores admin information", () => {
    const admin = {
      conversations: {
        count: 1,
      },
    };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, apiActions.apiAdminSuccess({ admin }));
    expect(state).toEqual({
      ...prevState,
      loading: false,
      admin,
    });
  });

  it("handles admin API errors", () => {
    const error = "some error";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, apiActions.apiAdminError({ error }));
    expect(state).toEqual({
      ...prevState,
      loading: false,
      error,
    });
  });

  it("starts setting admin parameters", () => {
    const params = { some: "params" };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(
      prevState,
      apiActions.apiSetAdminParametersRequest(params),
    );
    expect(state).toEqual({
      ...prevState,
      error: null,
      loading: true,
    });
  });

  it("stores the admin parameters", () => {
    const params = { some: "params" };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(
      prevState,
      apiActions.apiSetAdminParametersSuccess({
        params,
      }),
    );
    expect(state).toEqual({
      ...prevState,
      loading: false,
      admin: {
        params,
      },
    });
  });

  it("handles admin parameters errors", () => {
    const error = "some error";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(
      prevState,
      apiActions.apiSetAdminParametersError({
        error,
      }),
    );
    expect(state).toEqual({
      ...prevState,
      error,
      loading: false,
    });
  });

  it("stores the app properties", () => {
    const properties = {
      name: "Zoapp",
      subname: "CE",
    };
    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.appSetProperties(properties));
    expect(state).toEqual({
      ...prevState,
      ...properties,
    });
  });

  it("sets the application title", () => {
    const screen = { title: "app title", name: "app name" };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.appSetScreen(screen));
    expect(state).toEqual({
      ...prevState,
      activeScreen: screen,
    });
  });

  it("sets the active tab panel", () => {
    const activeTabIndex = 1;

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.appSetActiveTab(activeTabIndex));
    expect(state).toEqual({
      ...prevState,
      activeTab: activeTabIndex,
    });
  });

  it("resets the state when user signs out", () => {
    const screen = { title: "app title", name: "app name" };

    const prevState = reducer(undefined, actions.appSetScreen(screen));
    expect(prevState).toEqual({
      ...initialState,
      activeScreen: screen,
    });

    const state = reducer(prevState, authActions.signOutComplete({}));
    expect(state).toEqual(initialState);
  });
});
