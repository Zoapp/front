/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardText,
  CardActions,
  FormField,
  TextField,
} from "zrmc";
import { connect } from "react-redux";
import { signUp } from "../actions/auth";
import { appSetTitleName } from "../actions/app";

export class SignUpFormBase extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    /* Display accept checkbox for terms */
    accept: true,
  };

  constructor(props) {
    super(props);

    const { screen } = props;
    props.appSetTitleName(screen.name);
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { username, email, password, accept } = this.state;

    if (username !== "" && email !== "" && password !== "" && accept) {
      this.props.signUp(provider, username, email, password, accept);
    }
  };

  createChangeHandler = (field) => (e) => {
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
        <form id="signup-form-form" onSubmit={this.handleSignUp}>
          <CardText>
            <FormField style={{ display: "block" }}>
              <TextField
                id="signup-form-username"
                defaultValue={username}
                onChange={this.createChangeHandler("username")}
                label="Username"
                style={{ width: "100%" }}
                autoComplete="username"
                required
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                id="signup-form-email"
                defaultValue={username}
                onChange={this.createChangeHandler("email")}
                label="Email"
                style={{ width: "100%" }}
                autoComplete="email"
                required
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                id="signup-form-password"
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
            <Button type="submit">Create</Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

SignUpFormBase.propTypes = {
  provider: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  screen: PropTypes.shape({}).isRequired,
  appSetTitleName: PropTypes.func.isRequired,
};

SignUpFormBase.defaultProps = {
  provider: null,
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (provider, username, password) => {
    dispatch(signUp({ provider, username, password }));
  },
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(null, mapDispatchToProps)(SignUpFormBase);
