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
import SignUp from "../components/auth/signUp";

export class AuthenticateBase extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    display: "signin",
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

  handleRecoverPassword = (e) => {
    e.preventDefault();
    // TODO
  };

  switchDisplay = () => {
    this.setState({
      display: this.state.display === "signin" ? "signup" : "signin",
    });
  };

  createChangeHandler = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, email, password, accept, display } = this.state;
    const { isDialog, recoverPassword } = this.props;
    let form;
    const container = isDialog ? DialogBody : CardText;
    let title;
    let action;
    const actions = [];
    if (display === "signup") {
      form = (
        <SignUp
          username={username}
          email={email}
          password={password}
          accept={accept}
          createChangeHandler={this.createChangeHandler}
          container={container}
          signIn={this.switchDisplay}
        />
      );
      title = "Create an account";
      action = "Register";
    } else {
      if (recoverPassword) {
        actions.push(
          <Button
            key="but_lost_pass"
            onClick={this.handleRecoverPassword}
            className="authenticate_lostPassword"
          >
            Lost password ?
          </Button>,
        );
      }
      form = (
        <SignIn
          username={username}
          password={password}
          createChangeHandler={this.createChangeHandler}
          container={container}
          signUp={this.props.signUpValidation ? this.switchDisplay : undefined}
          recoverPassword={recoverPassword ? this.handleRecoverPassword : ""}
        />
      );
      if (isDialog) {
        title = "Your credentials";
      } else {
        title = "Please login to continue";
      }
      action = "Sign in";
    }
    action = (
      <Button
        key="but_sign"
        type="submit"
        className="authenticate_submit"
        raised
        dense
      >
        {action}
      </Button>
    );
    if (this.props.isDialog) {
      actions.push(action);
      return (
        <form id="signin-dialog-form" onSubmit={this.handleSignIn}>
          <Dialog
            id={this.props.id}
            onClose={this.handleCloseDialog}
            header={title}
            width="320px"
          >
            {form}
            <DialogFooter>{actions}</DialogFooter>
          </Dialog>
        </form>
      );
    }
    actions.unshift(action);
    return (
      <Card shadow={0} style={{ width: "320px", margin: "auto" }} title={title}>
        <form id="signin-form-form" onSubmit={this.handleSignIn}>
          {form}
          <CardActions>{actions}</CardActions>
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
  signUpValidation: PropTypes.string,
  display: PropTypes.string,
  recoverPassword: PropTypes.bool,
};

AuthenticateBase.defaultProps = {
  provider: null,
};

const mapStateToProps = (state) => {
  const { configuration } = state.app;
  let signUpValidation;
  if (configuration.backend.auth.signUp) {
    signUpValidation = configuration.backend.auth.signUp.validation;
  }
  const recoverPassword = !!configuration.backend.auth.recoverPassword;
  return {
    signUpValidation,
    recoverPassword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (provider, username, password) => {
    dispatch(signIn({ provider, username, password }));
  },
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateBase);
