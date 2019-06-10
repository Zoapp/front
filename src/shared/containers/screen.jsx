/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { appSetTitleName } from "../actions/app";

class Screen extends Component {
  constructor(props) {
    super(props);

    const { screen } = props;
    props.appSetTitleName(screen.name);
  }

  render() {
    const { children } = this.props;
    return (
      <div style={{ padding: "48px" }}>
        {children} : activeTab={this.props.activeTab}
      </div>
    );
  }
}

Screen.defaultProps = {
  activeTab: 0,
};

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  appSetTitleName: PropTypes.func.isRequired,
  screen: PropTypes.shape({}).isRequired,
  activeTab: PropTypes.number,
};

const mapStateToProps = (state) => {
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = state.loading;
  return {
    isLoading,
    isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetTitleName: (screen) => {
    dispatch(appSetTitleName(screen));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
