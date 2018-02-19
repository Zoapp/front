import createReducer from "shared/reducers/createReducer";

describe("reducers/createReducer", () => {
  it("creates a reducer", () => {
    const initialState = { foo: "foo" };
    const handlers = {};

    const reducer = createReducer(initialState, handlers);

    expect(reducer).toBeInstanceOf(Function);
    // always returns initialState if nothing is supplied
    expect(reducer()).toEqual(initialState);
  });

  it("calls a handler if it exists", () => {
    const initialState = { foo: "foo" };
    const handlers = {
      MY_HANDLER: state => ({ ...state, foo: "new-value" }),
    };

    const reducer = createReducer(initialState, handlers);

    const state = reducer(undefined, { type: "MY_HANDLER" });
    expect(state).toEqual({
      ...initialState,
      foo: "new-value",
    });
  });
});
