import React from "react";
import PropTypes from "prop-types";
import { FormField, TextField, Button } from "zrmc";

const SignIn = ({
  username,
  password,
  createChangeHandler,
  container,
  signUp,
  disabled,
  children,
}) => {
  const form = [];
  if (signUp) {
    form.push(
      <div key="signin-form-signup" className="authenticate_sign">
        Don&#39;t have an account ?
        <Button dense onClick={signUp} disabled={disabled}>
          Register now
        </Button>
      </div>,
    );
  }
  form.push(
    <FormField key="signin-form-username" style={{ display: "block" }}>
      <TextField
        id="signin-form-username"
        defaultValue={username}
        onChange={createChangeHandler("username")}
        label="Username | Email"
        dense
        style={{ width: "100%" }}
        autoComplete="username email"
        required
        disabled={disabled}
      />
    </FormField>,
  );
  form.push(
    <FormField key="signin-form-password" style={{ display: "block" }}>
      <TextField
        id="signin-form-password"
        defaultValue={password}
        onChange={createChangeHandler("password")}
        label="Password"
        dense
        type="password"
        style={{ width: "100%" }}
        autoComplete="password"
        required
        disabled={disabled}
      />
    </FormField>,
  );
  form.push(children);
  return React.createElement(container, {}, form);
};

SignIn.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  createChangeHandler: PropTypes.func,
  container: PropTypes.func,
  signUp: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default SignIn;
