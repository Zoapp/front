import * as authActions from "@shared/actions/auth";
import * as actions from "@shared/actions/user";
import reducer, { initialState } from "@shared/reducers/user";

describe("reducers/user", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("fetches the user profile", () => {
    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.apiUserProfileRequest());
    expect(state).toEqual({
      ...prevState,
      loading: true,
    });
  });

  it("stores user's information after successful authentication", () => {
    const attributes = {
      accessToken: "xyz",
      expiresIn: "3600",
      scope: "admin",
    };
    const provider = "auth provider";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, authActions.signInComplete({
      attributes,
      provider,
    }));
    expect(state).toEqual({
      ...prevState,
      attributes,
      isSignedIn: true,
      loading: false,
    });
  });

  it("resets the state when user signs out", () => {
    const attributes = {
      accessToken: "xyz",
      expiresIn: "3600",
      scope: "admin",
    };
    const provider = "auth provider";

    const prevState = reducer(undefined, authActions.signInComplete({
      attributes,
      provider,
    }));

    const state = reducer(prevState, authActions.signOutComplete({ provider }));
    expect(state).toEqual(initialState);
  });

  it("stores the user profile", () => {
    const profile = {
      avatar: "default",
      email: "test@example.org",
      id: "yk1zEPEeTy37fwXoEoaayUrgA2EAULcQ",
      username: "test",
    };

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.apiUserProfileSuccess({ profile }));
    expect(state).toEqual({
      ...prevState,
      error: null,
      loading: false,
      profile,
    });
  });

  it("handles error when fetching user profile", () => {
    const error = "some error";

    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.apiUserProfileError({ error }));
    expect(state).toEqual({
      ...prevState,
      loading: false,
      error,
    });
  });
});
