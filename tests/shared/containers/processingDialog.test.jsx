import React from "react";
import { shallow } from "enzyme";

import ProcessingDialog from "shared/containers/processingDialog";

describe("containers/processingDialog", () => {
  it("should update openDialog state", () => {
    const wrapper = shallow(<ProcessingDialog open />);

    expect(wrapper.state("openDialog")).toEqual(true);

    wrapper.setProps({ open: false });
    expect(wrapper.state("openDialog")).toEqual(false);
  });
});
