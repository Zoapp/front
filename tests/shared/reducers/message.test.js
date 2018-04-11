import * as actions from "shared/actions/message";
import reducer, {
  initialState,
  addErrorToState,
} from "shared/reducers/message";

describe("reducers/app", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("sets message", () => {
    const prevState = reducer(undefined, {});
    expect(prevState).toEqual(initialState);

    const state = reducer(prevState, actions.setMessage("An error message"));
    expect(state).toEqual({
      ...prevState,
      message: "An error message",
    });
  });

  it("removes message", () => {
    const prevState = reducer(
      undefined,
      actions.setMessage("An error message"),
    );
    expect(prevState).toEqual({
      ...initialState,
      message: "An error message",
    });

    const state = reducer(prevState, actions.removeMessage());
    expect(state).toEqual({
      ...prevState,
      message: null,
    });
  });

  describe("addErrorToState", () => {
    it("accepts an error as a string", () => {
      const state = addErrorToState(initialState, {
        error: "An error message",
      });

      expect(state).toEqual({
        ...initialState,
        message: "An error message",
      });
    });

    it("accepts an error as a Error object", () => {
      const state = addErrorToState(initialState, {
        error: Error("An error message"),
      });

      expect(state).toEqual({
        ...initialState,
        message: "An error message",
      });
    });

    it("throws a Error object if the error message is not a valid string", () => {
      expect(() => {
        addErrorToState(initialState, { error: true });
      }).toThrowError("addErrorToState requires either an Error or a string");
    });
  });
});
