/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cell, FormField, Inner, TextField } from "zrmc";

import Avatar from "./avatar";

class Settings extends Component {
  render() {
    const { profile } = this.props;

    return (
      <Inner>
        <Cell span={6}>
          <FormField style={{ display: "block" }}>
            <TextField
              label="Username"
              autoComplete="username"
              defaultValue={profile.username}
              style={{ width: "100%" }}
              onChange={this.props.onChangeHandler("username")}
              required
            />
          </FormField>
          <FormField style={{ display: "block" }}>
            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              defaultValue={profile.email}
              style={{ width: "100%" }}
              onChange={this.props.onChangeHandler("email")}
              required
            />
          </FormField>
          <FormField style={{ display: "block" }}>
            <TextField
              label="Password"
              autoComplete="password"
              type="password"
              style={{ width: "100%" }}
              onChange={this.props.onChangeHandler("password")}
              dense
            />
          </FormField>
        </Cell>
        <Cell span={6}>
          <Avatar src={profile.avatar} size={200} />
          {this.props.avatarChildren}
        </Cell>
      </Inner>
    );
  }
}

Settings.defaultProps = {
  profile: {},
  onChangeHandler: () => {},
  avatarChildren: null,
};

Settings.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
  avatarChildren: PropTypes.shape({}),
};

export default Settings;
