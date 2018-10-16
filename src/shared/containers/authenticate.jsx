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
  LinearProgress,
} from "zrmc";
import { connect } from "react-redux";
import { signIn } from "../actions/auth";
import { appSetTitleName } from "../actions/app";
import SignIn from "../components/auth/signIn";
import SignUp from "../components/auth/signUp";
import LostPassword from "../components/auth/lostPassword";

export class AuthenticateBase extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    display: "signin",
    error: null,
    displayedError: false,
    isLoading: false,
  };

  constructor(props) {
    super(props);

    const { screen } = props;
    if (screen) {
      props.appSetTitleName(screen.name);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { error } = props;

    if (error !== state.error) {
      return {
        error,
        displayedError: false,
      };
    }
    return null;
  }

  handleCloseDialog = () => {
    Zrmc.closeDialog();
    if (this.props.onClosed) {
      this.props.onClosed();
    }
  };

  componentDidUpdate() {
    // WIP
    if (
      this.props.isDialog &&
      this.state.isLoading &&
      !this.props.isLoading &&
      !this.props.error
    ) {
      this.handleCloseDialog();
    }
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { username, password } = this.state;
    if (username !== "" && password !== "") {
      this.props.signIn(provider, username, password);
      if (this.props.isDialog) {
        this.setState({ isLoading: true });
      }
    }
  };

  handleRecoverPassword = (e) => {
    e.preventDefault();
    // TODO
  };

  switchDisplay = (
    display = this.state.display === "signin" ? "signup" : "signin",
  ) => {
    if (this.state.display !== display) {
      this.setState({
        display,
        displayedError: true,
      });
    }
  };

  displaySignUp = () => {
    this.switchDisplay("signup");
  };

  displaySignIn = () => {
    this.switchDisplay("signin");
  };

  displayLostPassword = () => {
    this.switchDisplay("lostpassword");
  };

  createChangeHandler = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { username, email, password, accept, display, error } = this.state;
    const { isLoading, isDialog, recoverPassword } = this.props;
    // const isLoading = true;
    let form;
    const container = isDialog ? DialogBody : CardText;
    let title;
    let action;
    const actions = [];
    let errorMessage = "";
    let progress;
    if (error && !this.state.displayedError && !isLoading) {
      errorMessage = <div className="authenticate_error">{error}</div>;
    } else if (isLoading) {
      progress = <LinearProgress buffer={0} indeterminate />;
      if (isDialog) {
        errorMessage = progress;
      }
    }

    if (display === "lostpassword") {
      form = (
        <LostPassword
          email={email}
          password={password}
          accept={accept}
          createChangeHandler={this.createChangeHandler}
          container={container}
          disabled={isLoading}
        >
          {errorMessage}
        </LostPassword>
      );
      title = "Change your password";
      action = "Send";
      actions.push(
        <Button
          key="but_cancel_pass"
          onClick={this.displaySignIn}
          className="authenticate_lostPassword"
          disabled={isLoading}
        >
          Cancel
        </Button>,
      );
    } else if (display === "signup") {
      form = (
        <SignUp
          username={username}
          email={email}
          password={password}
          accept={accept}
          createChangeHandler={this.createChangeHandler}
          container={container}
          signIn={this.displaySignIn}
          disabled={isLoading}
        >
          {errorMessage}
        </SignUp>
      );
      title = "Create an account";
      action = "Register";
    } else {
      if (recoverPassword) {
        actions.push(
          <Button
            key="but_lost_pass"
            onClick={this.displayLostPassword}
            className="authenticate_lostPassword"
            disabled={isLoading}
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
          signUp={this.props.signUpValidation ? this.displaySignUp : undefined}
          disabled={isLoading}
        >
          {errorMessage}
        </SignIn>
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
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : action}
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
          {progress}
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
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

AuthenticateBase.defaultProps = {
  provider: null,
};

const mapStateToProps = (state) => {
  const { error, loading } = state.auth;
  const { configuration } = state.app;
  let signUpValidation;
  if (configuration.backend.auth.signUp) {
    signUpValidation = configuration.backend.auth.signUp.validation;
  }
  const recoverPassword = !!configuration.backend.auth.recoverPassword;
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return {
    signUpValidation,
    recoverPassword,
    isLoading: loading,
    error: errorMessage,
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
