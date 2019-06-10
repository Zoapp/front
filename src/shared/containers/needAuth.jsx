import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Card, CardText } from "zrmc";

import { appSetTitleName } from "../actions/app";

class NeedAuth extends React.Component {
  constructor(props) {
    super(props);

    props.appSetTitleName(props.screen.name);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Card title="Caution" style={{ width: "320px", margin: "auto" }}>
        <CardText>
          This page require authentication please signIn first.
        </CardText>
      </Card>
    );
  }
}

NeedAuth.propTypes = {
  screen: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  appSetTitleName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(NeedAuth);
