/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Rmdc, { Button, Card, CardText, CardActions, FormField, TextField } from "react-material-cw";
import { connect } from "react-redux";
import { signIn } from "../actions/authenticate";

class SignInForm extends Component {
  handleCloseDialog = () => {
    Rmdc.closeDialog();
    if (this.props.onClosed instanceof Function) {
      this.props.onClosed();
    }
  }

  handleSignIn = () => {
    const username = this.usernameField.inputRef.value;
    const password = this.passwordField.inputRef.value;
    if (username !== "" && password !== "") {
      const { provider, dispatch } = this.props;
      dispatch(signIn({ provider, username, password }));
      this.handleCloseDialog();
    }
  }

  render() {
    return (
      <Card
        shadow={0}
        style={{ width: "512px", margin: "auto" }}
        title="Your credentials"
      >
        <CardText>
          <form>
            <FormField style={{ display: "block" }}>
              <TextField
                onChange={this.handleUsernameChange}
                label="Username | Email"
                style={{ width: "100%" }}
                autoComplete="username email"
                ref={(input) => { this.usernameField = input; }}
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                onChange={this.handlePasswordChange}
                label="Password"
                type="password"
                style={{ width: "100%" }}
                autoComplete="password"
                ref={(input) => { this.passwordField = input; }}
              />
            </FormField>
          </form>
        </CardText>
        <CardActions>
          <Button type="button" onClick={(e) => { e.preventDefault(); this.handleSignIn(); }}>Sign in</Button>
        </CardActions>
      </Card>
    );
  }
}

SignInForm.propTypes = {
  onClosed: PropTypes.func,
  provider: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {
  onClosed: null,
  provider: null,
};

export default connect()(SignInForm);
