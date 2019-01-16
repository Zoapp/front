import React from "react";
import renderer from "react-test-renderer";
import Avatar from "shared/components/avatar";

// Avatar component is a simple props only components
//
describe("Avatar", () => {
  it("renders correctly", () => {
    const component = renderer.create(React.createElement(Avatar));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("can take an src and size prop", () => {
    const component = renderer.create(
      React.createElement(Avatar, {
        src: "http://www.gravatar.com/avatar/?d=identicon",
        size: 100,
      }),
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
