/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Cell, FormField, Grid, Inner, TextField } from "zrmc";

import Loading from "../components/loading";
import { appSetTitleName } from "../actions/app";

import {
  apiUserProfileRequest,
  apiUserProfileUpdateRequest,
} from "../actions/user";

class Settings extends Component {
  constructor(props) {
    super(props);

    if (!props.profile && props.isSignedIn) {
      props.apiUserProfileRequest();
    }
    props.appSetTitleName("Profile");

    this.state = {
      profile: props.profile,
    };
  }

  onCancelClick = (e) => {
    e.preventDefault();
    if (this.props.isSignedIn) {
      this.props.apiUserProfileRequest();
      this.setState({ profile: { ...this.props.profile } });
    }
  };

  onSaveClick = (e) => {
    e.preventDefault();
    if (this.props.isSignedIn) {
      const profile = { ...this.props.profile, ...this.state.profile };
      this.props.apiUserProfileUpdateRequest(profile);
      this.setState({ profile });
    }
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

  updateChangeHandler = (field) => (e) => {
    this.setState({
      profile: { ...this.state.profile, [field]: e.target.value },
    });
  };

  render() {
    if (!this.props.isSignedIn || this.props.isLoading || !this.props.profile) {
      return <Loading />;
    }
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
        <Button key="btn-delete-account" dense type="button" outlined disabled>
          Delete my account and data
        </Button>,
      );
    }
    return (
      <div className="zap-settings zui-layout__content">
        <section>
          <Grid>
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
              <Inner>
                <Cell span={6}>
                  <FormField style={{ display: "block" }}>
                    <TextField
                      label="Username"
                      autoComplete="username"
                      defaultValue={this.props.profile.username}
                      style={{ width: "100%" }}
                      onChange={this.updateChangeHandler("username")}
                      required
                    />
                  </FormField>
                  <FormField style={{ display: "block" }}>
                    <TextField
                      label="E-mail"
                      type="email"
                      autoComplete="email"
                      defaultValue={this.props.profile.email}
                      style={{ width: "100%" }}
                      onChange={this.updateChangeHandler("email")}
                      required
                    />
                  </FormField>
                  <FormField style={{ display: "block" }}>
                    <TextField
                      label="Password"
                      autoComplete="password"
                      type="password"
                      style={{ width: "100%" }}
                      onChange={this.updateChangeHandler("password")}
                      dense
                    />
                  </FormField>
                </Cell>
                <Cell span={6}>
                  <img
                    src={
                      this.props.profile.avatar === "default"
                        ? "images/default.png"
                        : this.props.profile.avatar
                    }
                  />
                </Cell>
              </Inner>
              {footerButtons}
            </form>
          </Grid>
        </section>
      </div>
    );
  }
}

Settings.defaultProps = {
  isLoading: false,
  isSignedIn: false,
  profile: null,
  apiUserProfileRequest: () => {},
  appSetTitleName: () => {},
};

Settings.propTypes = {
  isLoading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  appSetTitleName: PropTypes.func.isRequired,
  apiUserProfileRequest: PropTypes.func.isRequired,
  apiUserProfileUpdateRequest: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
  downloadData: PropTypes.bool,
  removeAccount: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const profile = state.user ? state.user.profile : null;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = state.loading || state.user.loading;
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
    isLoading,
    isSignedIn,
    downloadData,
    removeAccount,
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
