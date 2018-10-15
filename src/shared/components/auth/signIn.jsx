import React from "react";
import PropTypes from "prop-types";
import { FormField, TextField } from "zrmc";

const SignIn = ({ username, password, createChangeHandler, container }) => {
  const usernameField = (
    <FormField key="signin-form-username" style={{ display: "block" }}>
      <TextField
        id="signin-form-username"
        defaultValue={username}
        onChange={createChangeHandler("username")}
        label="Username | Email"
        style={{ width: "100%" }}
        autoComplete="username email"
        required
      />
    </FormField>
  );
  const passwordField = (
    <FormField key="signin-form-password" style={{ display: "block" }}>
      <TextField
        id="signin-form-password"
        defaultValue={password}
        onChange={createChangeHandler("password")}
        label="Password"
        type="password"
        style={{ width: "100%" }}
        autoComplete="password"
        required
      />
    </FormField>
  );
  return React.createElement(container, {}, [usernameField, passwordField]);
};

SignIn.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  createChangeHandler: PropTypes.func,
  container: PropTypes.func,
};

export default SignIn;
