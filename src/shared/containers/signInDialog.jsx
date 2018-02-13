/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rmdc, {
  Dialog,
  DialogFooter,
  DialogBody,
  FormField,
  TextField,
  Button,
} from "zoapp-materialcomponents";
import { signIn } from "../actions/auth";

class SignInDialog extends Component {
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
      <Dialog
        id={this.props.id}
        onClose={this.handleCloseDialog}
        header="Your credentials"
        width="320px"
      >
        <DialogBody>
          <form>
            <FormField style={{ display: "block" }}>
              <TextField
                onChange={this.handleUsernameChange}
                label="Username | Email"
                style={{ width: "200px" }}
                autoComplete="username email"
                ref={(input) => { this.usernameField = input; }}
              />
            </FormField>
            <FormField style={{ display: "block" }}>
              <TextField
                onChange={this.handlePasswordChange}
                label="Password"
                type="password"
                style={{ width: "200px" }}
                autoComplete="password"
                ref={(input) => { this.passwordField = input; }}
              />
            </FormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button type="cancel" onClick={(e) => { e.preventDefault(); this.handleCloseDialog(); }}>Cancel</Button>
          <Button type="accept" onClick={(e) => { e.preventDefault(); this.handleSignIn(); }}>Sign in</Button>
        </DialogFooter>
      </Dialog>
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
