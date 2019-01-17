import React from "react";
import { shallow } from "enzyme";

import { UsersBase } from "shared/containers/admin/team";
import { TableComponent } from "zoapp-ui";
import { Dialog, Button } from "zrmc";

import { createFakeEvent } from "../../helpers";

import Panel from "../../../src/shared/components/panel";
import SignUp from "../../../src/shared/components/auth/signUp";
import Settings from "../../../src/shared/components/settings";

describe("containers/admin/team", () => {
  const defaultProps = {
    profile: {},
    user: {
      attributes: {
        scope: "admin",
      },
      profile: {
        id: 1,
        avatar: "default",
        email: "admin@admin.admin",
        username: "admin",
      },
    },
    users: [
      {
        id: 2,
        avatar: "default",
        email: "blbl@blbl.blbl",
        scope: "owner",
        username: "blbl",
      },
      {
        id: 3,
        avatar: "default",
        email: "blbl1@blbl1.blbl1",
        scope: "owner",
        username: "blbl1",
      },
    ],
    apiGetUsersRequest: () => {},
    menu: [],
    onSelect: () => {},
    isLoading: false,
    createUser: () => {},
    provider: "",
    error: null,
  };
  it("should render admin team component", () => {
    const wrapper = shallow(<UsersBase {...defaultProps} />);

    const table = wrapper.find(TableComponent);
    expect(table).toHaveLength(1);
    expect(table.prop("items")).toHaveLength(3);
    expect(wrapper.find(Dialog)).toHaveLength(0);
    expect(wrapper.find(Settings)).toHaveLength(0);
  });

  it("Should render signUp dialog on add button click", () => {
    const wrapper = shallow(<UsersBase {...defaultProps} />);

    wrapper
      .find(Panel)
      .dive()
      .find(Button)
      .simulate("click", createFakeEvent());
    expect(wrapper.state("displayAddUserDialog")).toEqual(true);

    wrapper.update();
    expect(wrapper.find(SignUp)).toHaveLength(1);
  });

  it("Should render settings dialog on users table line click", () => {
    const wrapper = shallow(<UsersBase {...defaultProps} />);

    const secondTableLineWrapper = wrapper
      .find(TableComponent)
      .dive()
      .find("tr")
      .at(1);

    // expect the second column of the second line
    expect(
      secondTableLineWrapper
        .find("td")
        .at(1)
        .text(),
    ).toEqual("blbl");

    secondTableLineWrapper.simulate("click", createFakeEvent());
    expect(wrapper.state("displayEditUserDialog")).toEqual(true);

    wrapper.update();
    expect(wrapper.find(Settings)).toHaveLength(1);
  });
});
