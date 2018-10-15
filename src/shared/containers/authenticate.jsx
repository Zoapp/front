/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Zrmc, {
  Button,
  Card,
  CardText,
  CardActions,
  Dialog,
  DialogBody,
  DialogFooter,
} from "zrmc";
import { connect } from "react-redux";
import { signIn } from "../actions/auth";
import { appSetTitleName } from "../actions/app";
import SignIn from "../components/auth/signIn";

export class AuthenticateBase extends Component {
  state = {
    username: "",
    password: "",
    display: "signIn",
  };

  constructor(props) {
    super(props);

    const { screen } = props;
    if (screen) {
      props.appSetTitleName(screen.name);
    }
  }

  handleCloseDialog = () => {
    Zrmc.closeDialog();
    if (this.props.onClosed) {
      this.props.onClosed();
    }
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { username, password } = this.state;

    if (username !== "" && password !== "") {
      this.props.signIn(provider, username, password);
      if (this.props.isDialog) {
        this.handleCloseDialog();
      }
    }
  };

  createChangeHandler = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, password } = this.state;

    if (this.props.isDialog) {
      return (
        <form id="signin-dialog-form" onSubmit={this.handleSignIn}>
          <Dialog
            id={this.props.id}
            onClose={this.handleCloseDialog}
            header="Your credentials"
            width="320px"
          >
            <SignIn
              username={username}
              password={password}
              createChangeHandler={this.createChangeHandler}
              container={DialogBody}
            />
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
    return (
      <Card
        shadow={0}
        style={{ width: "512px", margin: "auto" }}
        title="Your credentials"
      >
        <form id="signin-form-form" onSubmit={this.handleSignIn}>
          <SignIn
            username={username}
            password={password}
            createChangeHandler={this.createChangeHandler}
            container={CardText}
          />
          <CardActions>
            <Button type="submit">Sign in</Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

AuthenticateBase.propTypes = {
  id: PropTypes.string,
  provider: PropTypes.string,
  isDialog: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  screen: PropTypes.shape({}),
  appSetTitleName: PropTypes.func,
  onClosed: PropTypes.func,
};

AuthenticateBase.defaultProps = {
  provider: null,
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (provider, username, password) => {
    dispatch(signIn({ provider, username, password }));
  },
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(null, mapDispatchToProps)(AuthenticateBase);
