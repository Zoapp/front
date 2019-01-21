/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "zrmc";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

    this.img = null;
  }

  render() {
    const { src, className, size } = this.props;

    return (
      <React.Fragment>
        {(this.state.isLoading || src === "default") && (
          <Icon className={className} style={{ fontSize: size }}>
            account_circle
          </Icon>
        )}
        {src !== "default" && (
          <img
            src={`${src}?size=${size}`}
            className={className}
            ref={(i) => {
              this.img = i;
            }}
            onLoad={() => {
              const isLoading = !this.img.complete;
              if (!isLoading) {
                this.img.style.display = "block";
              }
              this.setState({ isLoading });
            }}
            onError={() => {
              this.img.style.display = "none";
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

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
