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

    const state = reducer(prevState, actions.addMessage("A message"));
    expect(state).toEqual({
      ...prevState,
      messages: [{ level: undefined, message: "A message" }],
    });
  });

  it("removes message", () => {
    const prevState = reducer(undefined, actions.addMessage("Another message"));
    expect(prevState).toEqual({
      ...initialState,
      messages: [
        { level: undefined, message: "A message" },
        { level: undefined, message: "Another message" },
      ],
    });

    const state = reducer(prevState, actions.removeMessage());
    expect(state).toEqual({
      ...prevState,
      messages: [{ level: undefined, message: "Another message" }],
    });
  });

  describe("addErrorToState", () => {
    it("accepts an error as a string", () => {
      const state = addErrorToState(initialState, {
        error: "An error message",
      });

      expect(state).toEqual({
        ...initialState,
        messages: [
          { level: undefined, message: "Another message" },
          { level: "error", message: "An error message" },
        ],
      });
    });
  });
});
