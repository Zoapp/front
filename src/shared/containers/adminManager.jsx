/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../components/loading";

import { appSetTitleName } from "../actions/app";

class AdminManager extends Component {
  constructor(props) {
    super(props);

    this.props.appSetTitleName("Admin");
  }

  render() {
    if (this.props.tabs.length === 0) {
      return null;
    }

    if (this.props.isLoading) {
      return <Loading />;
    }

    const active = this.props.activeTab;

    if (this.props.tabs[active] === undefined) {
      return null;
    }

    return (
      <div className="zap-admin zui-layout__content">
        <section>{this.props.tabs[active]}</section>
      </div>
    );
  }
}

AdminManager.defaultProps = {
  activeTab: 0,
  isLoading: false,
  isSignedIn: false,
};

AdminManager.propTypes = {
  activeTab: PropTypes.number,
  isLoading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  appSetTitleName: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
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
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminManager);
