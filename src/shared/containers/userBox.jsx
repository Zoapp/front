/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Button, IconButton, Menu, MenuItem } from "react-mdl";
import Rmdc, {
  Button,
  ToolbarSection,
  ToolbarIcon,
  Menu, MenuItem,
} from "react-material-cw";
import { connect } from "react-redux";
import { apiUserProfileRequest } from "../actions/user";
import SignInDialog from "./signInDialog";
import SignOutDialog from "./signOutDialog";

class UserBox extends Component {
  componentDidUpdate() {
    if ((!this.props.profile) && this.props.isSignedIn) {
      this.props.apiUserProfileRequest();
    }
  }

  handleOpenSignInDialog = () => {
    const dialog = <SignInDialog store={this.props.store} />;
    Rmdc.showDialog(dialog);
  }

  handleOpenSignOutDialog = () => {
    const dialog = (<SignOutDialog store={this.props.store} />);
    Rmdc.showDialog(dialog);
  }

  render() {
    if (this.props.isSignedIn) {
      const username = this.props.profile ? this.props.profile.username : "";
      // const avatarClass = this.props.profile ? `${this.props.profile.avatar}-icon` : "";
      let avatar = this.props.profile ? this.props.profile.avatar : null;
      if ((!avatar) || avatar === "default") {
        avatar = "account_circle";
      } else {
        avatar = "account_circle";
      }
      return (
        <ToolbarSection align="end" shrinkToFit >
          <div style={{ margin: "auto 24px auto 12px" }}>
            {username}
          </div>
          <ToolbarIcon
            name={avatar}
            menu={
              <Menu anchorMargin={{ bottom: "4px0" }} role="menu" >
                <MenuItem disabled>Profile</MenuItem>
                <MenuItem disabled>Settings</MenuItem>
                <MenuItem
                  onSelected={this.handleOpenSignOutDialog}
                >
                  Sign out
                </MenuItem>
              </Menu>}
          />

        </ToolbarSection>
      );
      /* return (
        <div style={this.props.style} >{username}
          <IconButton name={avatar} id="profile-menu" className={avatarClass} />
          <Menu target="profile-menu" align="right">
            <MenuItem disabled>Profile</MenuItem>
            <MenuItem disabled>Settings</MenuItem>
            <MenuItem onClick={(e) => { e.preventDefault(); this.handleOpenSignOutDialog(); }}>
              Sign out
            </MenuItem>
          </Menu>
        </div>); */
    }
    return (
      <ToolbarSection align="end" shrinkToFit >
        <Button
          onClick={(e) => { e.preventDefault(); this.handleOpenSignInDialog(); }}
          raised
          dense
          compact
          icon="account_circle"
          style={{ margin: "auto 24px auto 12px" }}
        >
          SignIn
        </Button>
      </ToolbarSection>
    );
    /* return (
      <div>
        <Button onClick={(e) => { e.preventDefault(); this.handleOpenSignInDialog(); }}>
          SignIn
        </Button>
        <IconButton name="account_circle" id="profile-menu" />
        <Menu target="profile-menu" align="right">
          <MenuItem disabled>Recover password</MenuItem>
          <MenuItem disabled>Sign up</MenuItem>
          <MenuItem disabled>Help</MenuItem>
        </Menu>
      </div>); */
  }
}

UserBox.defaultProps = { profile: null, isSignedIn: false };

UserBox.propTypes = {
  store: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({ username: PropTypes.string, avatar: PropTypes.string }),
  isSignedIn: PropTypes.bool,
  apiUserProfileRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const profile = state.user ? state.user.profile : null;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  return { profile, isSignedIn };
};

const mapDispatchToProps = dispatch => ({
  apiUserProfileRequest: () => {
    dispatch(apiUserProfileRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
