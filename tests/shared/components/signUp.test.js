import React from "react";
import { shallow } from "enzyme";

import SignUp from "shared/components/auth/signUp";

describe("SignUp", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <SignUp
        username="test"
        email="test@test.com"
        password="blbl"
        createChangeHandler={() => {}}
        container={() => {}}
        signIn={() => {}}
      >
        test child
      </SignUp>,
    );
  });

  it("Checkbox policy is not present", () => {
    expect(wrapper.exists("Checkbox")).toEqual(false);
    expect(
      wrapper
        .find("Button")
        .findWhere((n) => n.prop("id") === "btn-policy-link"),
    ).toHaveLength(0);
  });

  it("Checkbox policy is present", () => {
    const policyUrl = "blbl.com";
    wrapper.setProps({ policyUrl });
    expect(wrapper.exists("Checkbox")).toEqual(true);

    const linkWrapper = wrapper
      .find("Button")
      .findWhere((n) => n.prop("id") === "btn-policy-link");

    expect(linkWrapper).toHaveLength(1);
    expect(linkWrapper.children().text()).toEqual(policyUrl);
  });
});
