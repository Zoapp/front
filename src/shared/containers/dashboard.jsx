/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Inner, Cell } from "react-material-cw";
import Loading from "../components/loading";
import { appSetTitle } from "../actions/app";

class Dashboard extends Component {
  componentWillMount() {
    this.props.appSetTitle("Dashboard");
  }

  render() {
    const { isLoading } = this.props;
    if (!this.props.isSignedIn) {
      return (<div>You need to sign in...</div>);
    } else if (isLoading || this.props.admin == null) {
      return (<Loading />);
    }
    // const { admin } = this.props;
    return (
      <div className="mdl-color--grey-100">
        <Grid>
          <Inner>
            <Cell className="mdl-color--white" span={12}>
              Dashboard
            </Cell>
          </Inner>
        </Grid>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  admin: null,
  isLoading: false,
  isSignedIn: false,
};

Dashboard.propTypes = {
  admin: PropTypes.shape({ params: PropTypes.shape({}).isRequired }),
  isLoading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  appSetTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { admin } = state.app;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = state.loading;
  return { admin, isLoading, isSignedIn };
};

const mapDispatchToProps = dispatch => ({
  appSetTitle: (titleName) => {
    dispatch(appSetTitle(titleName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
