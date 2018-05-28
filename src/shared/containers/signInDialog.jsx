/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Zrmc, {
  Dialog,
  DialogFooter,
  DialogBody,
  FormField,
  TextField,
  Button,
} from "zrmc";
import { signIn } from "../actions/auth";

export class SignInDialogBase extends Component {
  state = {
    username: "",
    password: "",
  };

  handleCloseDialog = () => {
    Zrmc.closeDialog();
    if (this.props.onClosed !== null) {
      this.props.onClosed();
    }
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { username, password } = this.state;

    if (username !== "" && password !== "") {
      this.props.signIn(provider, username, password);
      this.handleCloseDialog();
    }
  };

  createChangeHandler = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <form id="signin-dialog-form" onSubmit={this.handleSignIn}>
        <Dialog
          id={this.props.id}
          onClose={this.handleCloseDialog}
          header="Your credentials"
          width="320px"
        >
          <DialogBody>
            <FormField style={{ display: "block" }}>
              <TextField
                id="signin-dialog-username"
                defaultValue={username}
                onChange={this.createChangeHandler("username")}
                label="Username | Email"
                style={{ width: "200px" }}
                autoComplete="username email"
                required
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                id="signin-dialog-password"
                defaultValue={password}
                onChange={this.createChangeHandler("password")}
                label="Password"
                type="password"
                style={{ width: "200px" }}
                autoComplete="password"
                required
              />
            </FormField>
          </DialogBody>
          <DialogFooter>
            <Button
              id="signin-dialog-cancel-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                this.handleCloseDialog();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Sign in</Button>
          </DialogFooter>
        </Dialog>
      </form>
    );
  }
}

SignInDialogBase.defaultProps = {
  id: null,
  onClosed: null,
  provider: null,
};

SignInDialogBase.propTypes = {
  id: PropTypes.string,
  onClosed: PropTypes.func,
  provider: PropTypes.string,
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (provider, username, password) => {
    dispatch(signIn({ provider, username, password }));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SignInDialogBase);
