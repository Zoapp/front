import * as actions from "shared/actions/initialize";
import reducer, { initialState } from "shared/reducers/initialize";

describe("reducers/initialize", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("initializes the auth settings", () => {
    const fakeConfig = { foo: "bar" };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.initAuthSettings(fakeConfig));
    expect(state).toEqual({
      ...fakeConfig,
    });
  });
});
