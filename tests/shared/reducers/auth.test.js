import * as actions from "shared/actions/auth";
import reducer, { initialState } from "shared/reducers/auth";

describe("reducers/auth", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("requests sign in with a provider", () => {
    const provider = "some provider";
    const username = "johndoe";
    const password = "secret";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signIn({
      password,
      provider,
      username,
    }));
    expect(state).toEqual({
      ...prevState,
      [provider]: {
        loading: true,
        error: null,
      },
      password,
      provider,
      username,
    });
  });

  it("requests sign in without a provider", () => {
    const username = "johndoe";
    const password = "secret";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signIn({
      username,
      password,
    }));
    expect(state).toEqual({
      ...prevState,
      loading: true,
      password,
      provider: undefined,
      username,
    });
  });

  it("signs in a user with a provider", () => {
    const provider = "some provider";
    const username = "johndoe";
    const password = "secret";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signInComplete({
      password,
      provider,
      username,
    }));
    expect(state).toEqual({
      ...prevState,
      [provider]: {
        loading: false,
        error: null,
      },
    });
  });

  it("signs in a user without a provider", () => {
    const username = "johndoe";
    const password = "secret";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signInComplete({
      password,
      username,
    }));
    expect(state).toEqual({
      ...prevState,
      loading: false,
      error: null,
    });
  });

  it("handles sign in errors with a provider", () => {
    const error = "some error";
    const provider = "some provider";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signInError({
      error,
      provider,
    }));
    expect(state).toEqual({
      ...prevState,
      [provider]: {
        error,
        loading: false,
      },
    });
  });

  it("handles sign in errors without a provider", () => {
    const error = "some error";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signInError({ error }));
    expect(state).toEqual({
      ...prevState,
      error,
      loading: false,
    });
  });

  it("requests sign out", () => {
    const provider = "some provider";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signOut({ provider }));
    expect(state).toEqual({
      ...prevState,
      loading: true,
    });
  });

  it("signs out a user", () => {
    const provider = "some provider";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signOutComplete({ provider }));
    expect(state).toEqual(initialState);
  });

  it("handles sign out errors", () => {
    const error = "some error";
    const provider = "some provider";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.signOutError({
      error,
      provider,
    }));
    expect(state).toEqual({
      ...prevState,
      error,
      loading: false,
    });
  });
});
