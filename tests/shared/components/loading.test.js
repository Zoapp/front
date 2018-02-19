import React from "react";
import renderer from "react-test-renderer";
import Loading from "shared/components/loading";

describe("Loading", () => {
  it("renders correctly", () => {
    const component = renderer.create(React.createElement(Loading));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
