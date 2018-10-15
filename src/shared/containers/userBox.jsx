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
  ToolbarSection,
  ToolbarIcon,
  Menu,
  MenuItem,
  Icon,
  MenuAnchor,
} from "zrmc";
import { connect } from "react-redux";
import { apiUserProfileRequest } from "../actions/user";
import Authenticate from "./authenticate";
import SignOutDialog from "./signOutDialog";

class UserBox extends Component {
  componentDidUpdate() {
    if (!this.props.profile && this.props.isSignedIn) {
      this.props.apiUserProfileRequest();
    }
  }

  handleOpenSignInDialog = () => {
    const dialog = <Authenticate isDialog store={this.props.store} />;
    Zrmc.showDialog(dialog);
  };

  handleOpenSignOutDialog = () => {
    const dialog = <SignOutDialog store={this.props.store} />;
    Zrmc.showDialog(dialog);
  };

  render() {
    if (this.props.isSignedIn) {
      const username = this.props.profile ? this.props.profile.username : "";

      let avatar = this.props.profile ? this.props.profile.avatar : null;
      if (!avatar || avatar === "default") {
        avatar = "account_circle";
      } else {
        avatar = "account_circle";
      }

      return (
        <ToolbarSection align="end" shrinkToFit>
          <MenuAnchor
            menu={
              <Menu anchorMargin={{ bottom: "4px" }} role="menu">
                <MenuItem disabled>Profile</MenuItem>
                <MenuItem disabled>Settings</MenuItem>
                <MenuItem onSelected={this.handleOpenSignOutDialog}>
                  Sign out
                </MenuItem>
              </Menu>
            }
          >
            <div className="userbox">
              <div className="userbox_name">{username}</div>
              <div className="userbox_right">
                <ToolbarIcon name={avatar} />
                <Icon name="keyboard_arrow_down" />
              </div>
            </div>
          </MenuAnchor>
        </ToolbarSection>
      );
    }

    return (
      <ToolbarSection align="end" shrinkToFit>
        <Button
          onClick={(e) => {
            e.preventDefault();
            this.handleOpenSignInDialog();
          }}
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
  }
}

UserBox.defaultProps = { profile: null, isSignedIn: false };

UserBox.propTypes = {
  store: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  isSignedIn: PropTypes.bool,
  apiUserProfileRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const profile = state.user ? state.user.profile : null;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  return { profile, isSignedIn };
};

const mapDispatchToProps = (dispatch) => ({
  apiUserProfileRequest: () => {
    dispatch(apiUserProfileRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
