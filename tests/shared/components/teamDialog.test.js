import React from "react";
import { shallow } from "enzyme";

import { Button, Dialog } from "zrmc";
import TeamDialog from "../../../src/shared/components/teamDialog";

describe("TeamDialog", () => {
  const spyOnSubmit = jest.fn();
  const spyOnClose = jest.fn();
  const defaultProps = {
    onSubmit: spyOnSubmit,
    onClose: spyOnClose,
    header: "headerText",
    width: "200px",
    isLoading: false,
    error: null,
    footer: <Button>blbl</Button>,
  };

  it("Should render correctly", () => {
    const wrapper = shallow(
      <TeamDialog {...defaultProps}>
        <div id="child-test">childText</div>
      </TeamDialog>,
    );

    expect(wrapper.find("#child-test").text()).toEqual("childText");
    expect(wrapper.find(Dialog).props()).toMatchObject({
      header: "headerText",
      width: "200px",
    });

    expect(
      wrapper
        .find(Button)
        .dive()
        .text(),
    ).toEqual("blbl");
  });
});
