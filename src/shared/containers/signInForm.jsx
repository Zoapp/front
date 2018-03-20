/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardText, CardActions, FormField, TextField } from "zrmc";
import { connect } from "react-redux";
import { signIn } from "../actions/auth";

class SignInForm extends Component {
  state = {
    username: "",
    password: "",
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { provider, dispatch } = this.props;
    const { username, password } = this.state;

    if (username !== "" && password !== "") {
      dispatch(signIn({ provider, username, password }));
    }
  }

  createChangeHandler = field => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <Card
        shadow={0}
        style={{ width: "512px", margin: "auto" }}
        title="Your credentials"
      >
        <form onSubmit={this.handleSignIn}>
          <CardText>
            <FormField style={{ display: "block" }}>
              <TextField
                defaultValue={username}
                onChange={this.createChangeHandler("username")}
                label="Username | Email"
                style={{ width: "100%" }}
                autoComplete="username email"
                required
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                defaultValue={password}
                onChange={this.createChangeHandler("password")}
                label="Password"
                type="password"
                style={{ width: "100%" }}
                autoComplete="password"
                required
              />
            </FormField>
          </CardText>
          <CardActions>
            <Button type="submit">Sign in</Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

SignInForm.propTypes = {
  provider: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {
  provider: null,
};

export default connect()(SignInForm);
