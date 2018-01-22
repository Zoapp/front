/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";

const IconExButton = ({ name }) => {
  if (name === "robot") {
    return (
      <div className="mrb-panel-header-icon">
        <svg style={{ width: "20px", height: "20px", paddingBottom: "6px" }} viewBox="0 0 24 24">
          <path fill="#ffffff" d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
        </svg>
      </div>);
  } else if (name === "opla") { // TODO remove opla hardcoding
    return (<div className="mrb-panel-header-icon"><img alt="opla" /></div>);
  }
  return (<i className="material-icons mrb-panel-header-icon">{name}</i>);
};

IconExButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IconExButton;
