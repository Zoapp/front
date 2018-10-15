import React from "react";
import PropTypes from "prop-types";
import { FormField, TextField, Button } from "zrmc";

const SignUp = ({
  username,
  email,
  password,
  createChangeHandler,
  container,
  signIn,
}) => {
  const form = [];
  if (signIn) {
    form.push(
      <div key="signup-form-signup" className="authenticate_sign">
        Already have an account ?
        <Button dense onClick={signIn}>
          Login now
        </Button>
      </div>,
    );
  }
  form.push(
    <FormField key="signup-form-username" style={{ display: "block" }}>
      <TextField
        id="signup-form-username"
        defaultValue={username}
        onChange={createChangeHandler("username")}
        label="Username"
        dense
        style={{ width: "100%" }}
        autoComplete="username"
        required
      />
    </FormField>,
  );
  form.push(
    <FormField key="signup-form-email" style={{ display: "block" }}>
      <TextField
        id="signup-form-email"
        defaultValue={email}
        onChange={createChangeHandler("email")}
        label="Email"
        dense
        type="email"
        style={{ width: "100%" }}
        autoComplete="email"
        required
      />
    </FormField>,
  );
  form.push(
    <FormField key="signup-form-password" style={{ display: "block" }}>
      <TextField
        id="signup-form-password"
        defaultValue={password}
        onChange={createChangeHandler("password")}
        label="Password"
        dense
        type="password"
        style={{ width: "100%" }}
        autoComplete="password"
        required
      />
    </FormField>,
  );
  return React.createElement(container, {}, form);
};

SignUp.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  accept: PropTypes.bool,
  createChangeHandler: PropTypes.func,
  container: PropTypes.func,
  signIn: PropTypes.func,
};

export default SignUp;
