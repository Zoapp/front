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

class SignInDialog extends Component {
  state = {
    username: "",
    password: "",
  }

  handleCloseDialog = () => {
    Zrmc.closeDialog();
    if (this.props.onClosed instanceof Function) {
      this.props.onClosed();
    }
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { provider, dispatch } = this.props;
    const { username, password } = this.state;

    if (username !== "" && password !== "") {
      dispatch(signIn({ provider, username, password }));
      this.handleCloseDialog();
    }
  }

  createChangeHandler = field => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSignIn}>
        <Dialog
          id={this.props.id}
          onClose={this.handleCloseDialog}
          header="Your credentials"
          width="320px"
        >
          <DialogBody>
            <FormField style={{ display: "block" }}>
              <TextField
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
            <Button type="button">Cancel</Button>
            <Button type="submit">Sign in</Button>
          </DialogFooter>
        </Dialog>
      </form>
    );
  }
}

SignInDialog.defaultProps = {
  id: null,
  onClosed: null,
  provider: null,
};

SignInDialog.propTypes = {
  id: PropTypes.string,
  onClosed: PropTypes.func,
  provider: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SignInDialog);
