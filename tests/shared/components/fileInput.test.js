import React from "react";
import renderer from "react-test-renderer";
import FileInput from "shared/components/fileInput";

describe("FileInput", () => {
  it("renders correctly", () => {
    const component = renderer.create(React.createElement(FileInput));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("can take an accept prop", () => {
    const component = renderer.create(
      React.createElement(FileInput, { accept: "image/*" }),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
