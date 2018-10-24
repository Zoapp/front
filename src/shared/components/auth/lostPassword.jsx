import React from "react";
import PropTypes from "prop-types";
import { FormField, TextField } from "zrmc";

const LostPassword = ({
  email,
  createChangeHandler,
  container,
  disabled,
  children,
}) => {
  const form = [];
  form.push(
    <div key="signin-form-signup" className="authenticate_sign">
      Don&#39;t remember your password ? We could send you an email to reset it.
    </div>,
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
        disabled={disabled}
      />
    </FormField>,
  );
  form.push(children);
  return React.createElement(container, {}, form);
};

LostPassword.propTypes = {
  email: PropTypes.string,
  createChangeHandler: PropTypes.func,
  container: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default LostPassword;
