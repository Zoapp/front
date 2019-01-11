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
import { signIn, signUp, lostPassword } from "../actions/auth";
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
    display: null,
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

    // accept is set to true if policyUrl is unDefined
    this.state.accept = !props.policyUrl;
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
    if (this.state.isLoading && !this.props.isLoading && !this.props.error) {
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

  handleSignUp = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { username, email, password, accept } = this.state;
    if (username !== "" && password !== "" && email !== "") {
      this.props.signUp(provider, username, email, password, accept);
      if (this.props.isDialog) {
        this.setState({ isLoading: true });
      }
    }
  };

  handleLostPassword = (e) => {
    e.preventDefault();
    const { provider } = this.props;
    const { email } = this.state;
    if (email !== "") {
      this.props.lostPassword(provider, email);
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

  getLostPasswordForm = (
    container,
    email,
    password,
    isLoading,
    errorMessage,
  ) => ({
    handler: this.handleLostPassword,
    form: (
      <LostPassword
        email={email}
        password={password}
        createChangeHandler={this.createChangeHandler}
        container={container}
        disabled={isLoading}
      >
        {errorMessage}
      </LostPassword>
    ),
    title: "Change your password",
    action: "Send",
    actions: [
      <Button
        key="but_cancel_pass"
        onClick={this.displaySignIn}
        className="authenticate_lostPassword"
        disabled={isLoading}
      >
        Cancel
      </Button>,
    ],
  });

  getSignUpForm = (
    container,
    username,
    email,
    password,
    isLoading,
    errorMessage,
  ) => ({
    handler: this.handleSignUp,
    form: (
      <SignUp
        username={username}
        email={email}
        password={password}
        createChangeHandler={this.createChangeHandler}
        container={container}
        signIn={this.displaySignIn}
        disabled={isLoading}
        policyUrl={this.props.policyUrl}
      >
        {errorMessage}
      </SignUp>
    ),
    title: "Create an account",
    action: "Register",
    actions: [],
  });

  getSingInForm = (
    container,
    username,
    password,
    isLoading,
    errorMessage,
    recoverPassword,
    signUpValidation,
  ) => {
    const actions = [];
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

    return {
      handler: this.handleSignIn,
      form: (
        <SignIn
          username={username}
          password={password}
          createChangeHandler={this.createChangeHandler}
          container={container}
          signUp={signUpValidation ? this.displaySignUp : undefined}
          disabled={isLoading}
        >
          {errorMessage}
        </SignIn>
      ),
      title: "Please login to continue",
      action: "Sign in",
      actions,
    };
  };

  formatForm = (isDialog, buildedForm, id) => {
    if (isDialog) {
      return (
        <form id="signin-dialog-form" onSubmit={buildedForm.handler}>
          <Dialog
            id={id}
            onClose={this.handleCloseDialog}
            header={buildedForm.title}
            width="320px"
          >
            {buildedForm.form}
            <DialogFooter>{buildedForm.actions}</DialogFooter>
          </Dialog>
        </form>
      );
    }

    return (
      <Card
        shadow={0}
        style={{ width: "320px", margin: "auto" }}
        title={buildedForm.title}
      >
        <form id="signin-form-form" onSubmit={buildedForm.handler}>
          {buildedForm.form}
          <CardActions>{buildedForm.actions}</CardActions>
        </form>
      </Card>
    );
  };

  render() {
    const { username, email, password, error } = this.state;
    let { display } = this.state;
    const {
      isLoading,
      recoverPassword,
      screen,
      signUpValidation,
      isDialog,
    } = this.props;

    let errorMessage = "";
    if (error && !this.state.displayedError && !isLoading) {
      errorMessage = <div className="authenticate_error">{error}</div>;
    } else if (isLoading) {
      errorMessage = <LinearProgress buffer={0} indeterminate />;
    }

    if (!display && screen && screen.signUp && signUpValidation) {
      display = "signup";
    }

    const container = isDialog ? DialogBody : CardText;
    let buildedForm;
    if (display === "lostpassword") {
      buildedForm = this.getLostPasswordForm(
        container,
        email,
        password,
        isLoading,
        errorMessage,
      );
    } else if (display === "signup") {
      buildedForm = this.getSignUpForm(
        container,
        username,
        email,
        password,
        isLoading,
        errorMessage,
      );
    } else {
      buildedForm = this.getSingInForm(
        container,
        username,
        password,
        isLoading,
        errorMessage,
        recoverPassword,
        signUpValidation,
      );
    }

    buildedForm.actions.push(
      <Button
        key="but_sign"
        type="submit"
        className="authenticate_submit"
        raised
        dense
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : buildedForm.action}
      </Button>,
    );

    return this.formatForm(isDialog, buildedForm, this.props.id);
  }
}

AuthenticateBase.propTypes = {
  id: PropTypes.string,
  provider: PropTypes.string,
  isDialog: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  lostPassword: PropTypes.func.isRequired,
  screen: PropTypes.shape({}),
  appSetTitleName: PropTypes.func,
  onClosed: PropTypes.func,
  signUpValidation: PropTypes.string,
  policyUrl: PropTypes.string,
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
  const { policyUrl } = configuration.backend.auth;

  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  return {
    signUpValidation,
    recoverPassword,
    policyUrl,
    isLoading: loading,
    error: errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (provider, username, password) => {
    dispatch(signIn({ provider, username, password }));
  },
  signUp: (provider, username, email, password, accept) => {
    dispatch(signUp({ provider, username, email, password, accept }));
  },
  lostPassword: (provider, email) => {
    dispatch(lostPassword({ provider, email }));
  },
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateBase);
