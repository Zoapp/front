/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Zrmc from "zrmc";

import { createFakeEvent } from "tests/helpers";
import { SignInDialogBase } from "shared/containers/signInDialog";

describe("containers/signInDialog", () => {
  it("renders correctly", () => {
    // We are interested in seeing whether this method is called.
    const showModalSpy = jest.fn();

    // This represents the fake `dialogRef`
    const createNodeMock = () => ({
      addEventListener: jest.fn(),
      showModal: showModalSpy,
    });

    const component = renderer.create(<SignInDialogBase signIn={jest.fn()} />, {
      createNodeMock,
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(showModalSpy).toHaveBeenCalled();
  });

  it("sign in with fullfilled form", () => {
    // Override Zrmc to make sure it is called
    Zrmc.closeDialog = jest.fn();

    const signInSpy = jest.fn();
    const wrapper = shallow(<SignInDialogBase signIn={signInSpy} />);

    wrapper
      .find("#signin-dialog-username")
      .simulate("change", { target: { value: "username" } });
    expect(wrapper.state("username")).toEqual("username");

    wrapper
      .find("#signin-dialog-password")
      .simulate("change", { target: { value: "password" } });
    expect(wrapper.state("password")).toEqual("password");

    expect(signInSpy).not.toHaveBeenCalled();
    expect(Zrmc.closeDialog).not.toHaveBeenCalled();

    wrapper.find("#signin-dialog-form").simulate("submit", createFakeEvent());

    expect(signInSpy).toHaveBeenCalled();
    expect(Zrmc.closeDialog).toHaveBeenCalled();
  });

  it("should close dialog on cancel", () => {
    Zrmc.closeDialog = jest.fn();
    const signInSpy = jest.fn();
    const onClosedSpy = jest.fn();
    const wrapper = shallow(
      <SignInDialogBase signIn={signInSpy} onClosed={onClosedSpy} />,
    );

    wrapper
      .find("#signin-dialog-cancel-button")
      .simulate("click", { preventDefault() {} });
    expect(signInSpy).not.toHaveBeenCalled();
    expect(onClosedSpy).toHaveBeenCalled();
    expect(Zrmc.closeDialog).toHaveBeenCalled();
  });
});
