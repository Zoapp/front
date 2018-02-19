import { DialogManager } from "zoapp-materialcomponents";
import displayWebServiceEditor from "shared/components/displayWebServiceEditor";

// Mock `zoapp-ui`
jest.mock("zoapp-ui", () => ({ DialogManager: jest.fn() }));

describe("displayWebServiceEditor", () => {
  it("opens a Dialog", () => {
    // Configure a spy on the `DialogManager.open()` (i.e. an object that
    // records calls and other information on it)
    DialogManager.open = jest.fn();

    const title = "a title";
    const action = "an action";
    const actionDef = "an action def";
    const parameters = {};
    const setInput = jest.fn();
    const onEditAction = jest.fn();
    const className = "";

    displayWebServiceEditor(
      title,
      action,
      actionDef,
      parameters,
      setInput,
      onEditAction,
      className,
    );
    expect(DialogManager.open).toHaveBeenCalled();
  });
});
