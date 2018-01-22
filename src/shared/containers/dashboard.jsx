/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Content, Grid, Cell } from "react-mdl";
import Loading from "../components/loading";
import { appSetTitle } from "../actions/app";

class Dashboard extends Component {
  componentWillMount() {
    this.props.appSetTitle("Dashboard");
  }

  render() {
    /* const infoStyle = {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "400",
      color: "#888",
      padding: "16px 0",
      lineHeight: "1.1",
    };
    const infoStyleB = {
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "400",
      color: "#666",
      padding: "60px 0",
      lineHeight: "1.1",
    };
    const infoStyleC = {
      fontSize: "16px",
      fontWeight: "400",
      color: "green",
      padding: "60px 0",
      lineHeight: "1.1",
    };
    const infoStyleD = {
      fontSize: "16px",
      fontWeight: "400",
      color: "#666",
      padding: "16px",
      lineHeight: "1.1",
    }; */

    const { isLoading } = this.props;
    if (!this.props.isSignedIn) {
      return (<div>You need to sign in...</div>);
    } else if (isLoading || this.props.admin == null) {
      return (<Loading />);
    }
    // const { admin } = this.props;
    return (
      <Content className="mdl-color--grey-100">
        <Grid>
          <Cell className="mdl-color--white" col={12}>
            Dashboard
          </Cell>
        </Grid>
      </Content>
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
