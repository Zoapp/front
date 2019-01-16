/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "zrmc";

const Avatar = ({ size, src, className }) => {
  if (src === "default") {
    return (
      <Icon className={className} style={{ fontSize: size }}>
        account_circle
      </Icon>
    );
  }
  return <img src={`${src}?size=${size}`} className={className} />;
};

Avatar.defaultProps = {
  src: "default",
  className: "",
  size: 48,
};

Avatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Avatar;
