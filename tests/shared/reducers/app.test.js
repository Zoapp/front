import * as apiActions from "@shared/actions/api";
import reducer, { initialState } from "@shared/reducers/app";

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
});
