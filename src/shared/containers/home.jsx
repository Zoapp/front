/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { Card, CardText } from "zoapp-materialcomponents";
import { connect } from "react-redux";
import Dashboard from "./dashboard";

const Home = ({ isSignedIn }) => {
  if (isSignedIn) {
    return (<Dashboard />);
  }
  return (
    <div className="mdl-color--grey-100">
      <section className="text-section" style={{ margin: "40px" }}>
        <Card shadow={0} style={{ width: "512px", margin: "auto" }} title="Zoapp frontend">
          <CardText>
          A simple example
          </CardText>
        </Card>
      </section>
    </div>
  );
};

Home.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { admin } = state.app;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = state.loading;
  return { admin, isLoading, isSignedIn };
};


export default connect(mapStateToProps)(Home);
