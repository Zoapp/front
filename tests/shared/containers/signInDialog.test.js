/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { createFakeEvent } from "tests/helpers";
import { SignInDialogBase } from "shared/containers/signInDialog";

describe("containers/signInDialog", () => {
  it("renders correctly", () => {
    const signInSpy = jest.fn();
    const component = renderer.create(<SignInDialogBase signIn={signInSpy} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("sign in with fullfilled form", () => {
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

    wrapper.find("#signin-dialog-form").simulate("submit", createFakeEvent());

    expect(signInSpy).toHaveBeenCalled();
  });
});
