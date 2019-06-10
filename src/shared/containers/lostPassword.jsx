import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Card,
  CardText,
  Button,
  CardActions,
  TextField,
  LinearProgress,
} from "zrmc";

import { appSetTitleName } from "../actions/app";
import { resetPasswordRequest } from "../actions/auth";

import QueryParser from "../utils/queryParser";

class LostPassword extends React.Component {
  constructor(props) {
    super(props);

    props.appSetTitleName(props.screen.name);
    this.state = {
      newPasswords: {},
      error: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error && props.error !== state.error) {
      return { error: props.error };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.error && !this.props.loading && prevProps.loading) {
      this.props.history.push("/");
    }
  }

  onSaveClick = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword, email } = this.state.newPasswords;
    if (newPassword !== confirmPassword) {
      this.setState({ error: "The two password should be the same." });
      return;
    }
    const { reset_token: resetToken } = QueryParser.parse(
      this.props.location.search,
    );
    this.props.resetPassword(resetToken, newPassword, email);
  };

  createChangeHandler = (field) => (e) => {
    const { newPasswords } = this.state;
    newPasswords[field] = e.target.value;
    this.setState({ newPasswords, error: null });
  };

  render() {
    return (
      <Card
        title="Reset your password"
        style={{ width: "320px", margin: "auto" }}
      >
        <form id="signin-form-form" onSubmit={this.onSaveClick}>
          <CardText>
            <TextField
              onChange={this.createChangeHandler("email")}
              label="Email"
              dense
              type="email"
              style={{ width: "100%" }}
              autoComplete="email"
              required
            />
            <TextField
              onChange={this.createChangeHandler("newPassword")}
              label="New password"
              dense
              type="password"
              style={{ width: "100%" }}
              autoComplete="password"
              required
            />
            <TextField
              onChange={this.createChangeHandler("confirmPassword")}
              label="Confirm new password"
              dense
              type="password"
              style={{ width: "100%" }}
              autoComplete="password"
              required
            />
            {this.props.loading ? (
              <LinearProgress buffer={0} indeterminate />
            ) : (
              <div className="authenticate_error">{this.state.error}</div>
            )}
          </CardText>
          <CardActions>
            <Button raised dense type="submit" disabled={false}>
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

LostPassword.propTypes = {
  screen: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  appSetTitleName: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    resetPasswordError: error,
    resetPasswordLoading: loading,
  } = state.auth;
  return {
    error: error && error.message,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
  resetPassword: (resetToken, newPassword, email) => {
    dispatch(resetPasswordRequest(resetToken, newPassword, email));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LostPassword);
