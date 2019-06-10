/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DrawerFooter = (props) => (
  <React.Fragment>
    <p>
      <span>
        {props.name} {props.subname}
        {props.instanceName ? (
          <span>
            {" "}
            -{" "}
            <span style={{ color: props.instanceColor }}>
              {props.instanceName}
            </span>
          </span>
        ) : (
          ""
        )}
      </span>
      <br />v{props.version} {props.build ? ` - b${props.build}` : ""}
      <br />
    </p>
  </React.Fragment>
);

DrawerFooter.propTypes = {
  name: PropTypes.string.isRequired,
  subname: PropTypes.string,
  instanceName: PropTypes.string,
  instanceColor: PropTypes.string,
  version: PropTypes.string.isRequired,
  build: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { app } = state;
  return {
    name: app.name,
    subname: app.subname,
    instanceName: app.instance ? app.instance.name : null,
    instanceColor: app.instance ? app.instance.color : null,
    version: app.version,
    build: app.build,
  };
};

export default connect(
  mapStateToProps,
  null,
)(DrawerFooter);
