/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Grid, Icon, Inner } from "zrmc";

import Loading from "../components/loading";
import Settings from "../components/settings";
import { appSetTitleName } from "../actions/app";

import {
  apiUserProfileRequest,
  apiUserProfileUpdateRequest,
} from "../actions/user";

class SettingsManager extends Component {
  constructor(props) {
    super(props);

    if (!props.profile && props.isSignedIn) {
      props.apiUserProfileRequest();
    }
    props.appSetTitleName("Profile");

    this.state = {
      profile: props.profile,
      error: props.error,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { error, profile } = props;

    if (error !== state.error) {
      // Since there was an error, reset profile to latest props
      return {
        profile,
        error,
      };
    }
    return null;
  }

  onCancelClick = (e) => {
    e.preventDefault();
    this.props.apiUserProfileRequest();
    this.setState({ profile: { ...this.props.profile } });
  };

  onSaveClick = (e) => {
    if (e) e.preventDefault();
    const profile = { ...this.props.profile, ...this.state.profile };
    this.props.apiUserProfileUpdateRequest(profile);
    delete profile.password;
    this.setState({ profile });
  };

  updateChangeHandler = (field) => (e) => {
    this.setState({
      profile: { ...this.state.profile, [field]: e.target.value },
    });
  };

  hasProfileChanged = () => {
    const propsProfile = this.props.profile;
    const stateProfile = this.state.profile;
    return !(
      propsProfile &&
      stateProfile &&
      (propsProfile.username !== stateProfile.username ||
        propsProfile.email !== stateProfile.email ||
        propsProfile.password !== stateProfile.password)
    );
  };

  resetAvatar = () => {
    this.setState(
      {
        profile: { ...this.state.profile, avatar: "default" },
      },
      () => this.onSaveClick(),
    );
  };

  getFromGravatar = () => {
    this.setState(
      {
        profile: { ...this.state.profile, avatar: "reset" },
      },
      () => this.onSaveClick(),
    );
  };

  render() {
    let content = null;
    if (!this.props.isSignedIn || this.props.isLoading || !this.props.profile) {
      content = <Loading />;
    } else {
      const shouldDisableButton = this.hasProfileChanged();
      const footerButtons = [];
      if (this.props.downloadData) {
        footerButtons.push(
          <Button key="btn-view-data" dense type="button" outlined disabled>
            view my data
          </Button>,
        );
      }
      if (this.props.removeAccount) {
        footerButtons.push(
          <Button
            key="btn-delete-account"
            dense
            type="button"
            outlined
            disabled
          >
            Delete my account and data
          </Button>,
        );
      }
      content = (
        <form onSubmit={this.onSaveClick}>
          <Button
            raised
            dense
            type="button"
            onClick={this.onCancelClick}
            disabled={shouldDisableButton}
          >
            Cancel
          </Button>
          <Button raised dense type="submit" disabled={shouldDisableButton}>
            Save
          </Button>
          <Settings
            profile={this.props.profile}
            avatarChildren={
              <Inner>
                <Button onClick={this.resetAvatar}>
                  <Icon>delete</Icon>
                </Button>
                <Button onClick={this.getFromGravatar}>
                  <Icon>autorenew</Icon>
                </Button>
              </Inner>
            }
            onChangeHandler={this.updateChangeHandler}
            downloadData={this.props.downloadData}
            removeAccount={this.props.removeAccount}
            error={this.props.error}
          />
          <div className="authenticate_error">{this.state.error}</div>
          {footerButtons}
        </form>
      );
    }
    return (
      <div className="zap-settings zui-layout__content">
        <section>
          <Grid>{content}</Grid>
        </section>
      </div>
    );
  }
}

SettingsManager.defaultProps = {
  isLoading: false,
  isSignedIn: false,
  profile: {},
};

SettingsManager.propTypes = {
  isLoading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  apiUserProfileUpdateRequest: PropTypes.func.isRequired,
  apiUserProfileRequest: PropTypes.func.isRequired,
  appSetTitleName: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
  downloadData: PropTypes.bool,
  removeAccount: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { profile, isSignedIn, loading, error } = state.user;
  const { configuration } = state.app;
  let downloadData = false;
  let removeAccount = false;
  if (
    configuration.backend.auth &&
    configuration.backend.auth.accountSettings
  ) {
    ({
      downloadData,
      removeAccount,
    } = configuration.backend.auth.accountSettings);
  }
  return {
    profile,
    isLoading: loading,
    isSignedIn,
    downloadData,
    removeAccount,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  apiUserProfileRequest: () => {
    dispatch(apiUserProfileRequest());
  },
  appSetTitleName: (title) => {
    dispatch(appSetTitleName(title));
  },
  apiUserProfileUpdateRequest: (params) => {
    dispatch(apiUserProfileUpdateRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsManager);
