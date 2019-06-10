/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Inner, Cell, Button } from "zrmc";
import { connect } from "react-redux";
import { TableComponent } from "zoapp-ui";
import {
  apiGetUsersRequest,
  apiAdminUpdateProfileRequest,
} from "../../actions/api";
import {
  createUserRequest,
  adminUpdateAccountStateRequest,
} from "../../actions/auth";
import Avatar from "../../components/avatar";
import Panel from "../../components/panel";
import SignUp from "../../components/auth/signUp";
import Loading from "../../components/loading";
import Settings from "../../components/settings";
import TeamDialog from "../../components/teamDialog";
import AccountState from "../../components/accountState";

class Users extends Component {
  state = {
    displayAddUserDialog: false,
    displayEditUserDialog: false,
    displayEditStateDialog: false,
    selectedUser: null,
    newUser: {},
    editProfile: {},
    editState: {},
    isLoading: false,
    hasChanged: false,
    authError: null,
    userError: null,
  };

  componentDidMount() {
    this.props.apiGetUsersRequest();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isLoading && !props.isLoading) {
      const newState = {
        isLoading: false,
      };

      let shouldRequestUsers = false;

      if (!props.authError) {
        shouldRequestUsers = true;
        newState.displayAddUserDialog = false;
        newState.displayEditStateDialog = false;
        newState.newUser = {};
        newState.editState = {};
      } else {
        newState.authError = props.authError;
      }

      if (!props.userError) {
        shouldRequestUsers = true;
        newState.editProfile = {};
        newState.displayEditUserDialog = false;
      } else {
        newState.userError = props.userError;
      }

      if (shouldRequestUsers) {
        props.apiGetUsersRequest();
      }

      return newState;
    }
    return null;
  }

  handleCreateUser = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state.newUser;
    this.setState({ isLoading: true });
    this.props.createUser(this.props.provider, username, email, password);
  };

  handleEditUser = (e) => {
    e.preventDefault();
    const { selectedUser, editProfile } = this.state;
    let profile = {
      username: selectedUser.username,
      email: selectedUser.email,
      avatar: selectedUser.avatar,
    };

    profile = {
      ...profile,
      ...editProfile,
    };

    this.setState({ isLoading: true });
    this.props.apiAdminUpdateProfileRequest(profile, selectedUser.id);
  };

  handleEditState = (e) => {
    e.preventDefault();
    const { editState, selectedUser } = this.state;
    this.setState({ isLoading: true });
    this.props.adminUpdateAccountStateRequest(
      editState.newState,
      selectedUser.id,
    );
  };

  createChangeHandler = (entity) => (field) => (e) => {
    this.setState({
      [entity]: {
        ...this.state[entity],
        [field]: e.target.value,
      },
      hasChanged: true,
    });
  };

  handleMenuSelect = (action, userIndex) => {
    switch (action) {
      case "edit":
        this.setState({
          displayEditUserDialog: userIndex > 0,
          selectedUser: this.props.users[userIndex - 1],
          hasChanged: false,
          editProfile: {},
          userError: null,
        });
        break;
      case "state":
        this.setState({
          displayEditStateDialog: userIndex > 0,
          selectedUser: this.props.users[userIndex - 1],
          editState: {},
          authError: null,
        });
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  renderAddUserDialog = () => {
    const { isLoading, authError } = this.state;
    const { username, email, password } = this.state.newUser;

    return (
      <TeamDialog
        onSubmit={this.handleCreateUser}
        onClose={() => this.setState({ displayAddUserDialog: false })}
        header="Add user"
        width="320px"
        isLoading={isLoading}
        error={authError}
        footer={[
          <Button
            key="btn-cancel"
            className="authenticate_submit"
            dense
            disabled={isLoading}
            onClick={() => this.setState({ displayAddUserDialog: false })}
          >
            Cancel
          </Button>,
          <Button
            key="btn-create-user"
            type="submit"
            className="authenticate_submit"
            dense
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Create user"}
          </Button>,
        ]}
      >
        <SignUp
          username={username}
          email={email}
          password={password}
          createChangeHandler={this.createChangeHandler("newUser")}
          container={React.Fragment}
          disabled={false}
        />
      </TeamDialog>
    );
  };

  renderEditUserDialog = () => {
    const { isLoading, selectedUser, hasChanged, userError } = this.state;

    return (
      <TeamDialog
        onSubmit={this.handleEditUser}
        onClose={() => this.setState({ displayEditUserDialog: false })}
        header="Edit user"
        width="640px"
        isLoading={isLoading}
        error={userError}
        footer={[
          <Button
            key="btn-cancel"
            className="authenticate_submit"
            dense
            disabled={isLoading}
            onClick={() => this.setState({ displayEditUserDialog: false })}
          >
            Cancel
          </Button>,
          <Button
            key="btn-edit-user"
            type="submit"
            className="authenticate_submit"
            dense
            disabled={isLoading || !hasChanged}
          >
            {isLoading ? "Processing..." : "Edit user"}
          </Button>,
        ]}
      >
        <Settings
          profile={selectedUser}
          onChangeHandler={this.createChangeHandler("editProfile")}
        />
      </TeamDialog>
    );
  };

  renderEditStateDialog = () => {
    const { isLoading, selectedUser, authError, editState } = this.state;

    return (
      <TeamDialog
        onSubmit={this.handleEditState}
        onClose={() => this.setState({ displayEditStateDialog: false })}
        header="Edit user state account"
        width="500px"
        isLoading={isLoading}
        error={authError}
        footer={[
          <Button
            key="btn-cancel"
            className="authenticate_submit"
            dense
            disabled={isLoading}
            onClick={() => this.setState({ displayEditStateDialog: false })}
          >
            Cancel
          </Button>,
          <Button
            key="btn-disable-account"
            className="authenticate_submit"
            type="submit"
            dense
            disabled={isLoading || !editState.newState}
          >
            {isLoading ? "Processing..." : "Edit account state"}
          </Button>,
        ]}
      >
        <AccountState
          user={selectedUser}
          onChangeHandler={this.createChangeHandler("editState")}
        />
      </TeamDialog>
    );
  };

  render() {
    const items = [];
    const status = "you";
    const { user, profile, users } = this.props;
    const { scope } = user.attributes;

    if (!profile) {
      return <Loading />;
    }

    const values = [];
    values.push(profile.username);
    values.push(profile.email);
    values.push(scope);
    values.push(status);

    items.push({
      id: 1,
      values,
      icon: <Avatar src={profile.avatar} size={36} />,
    });

    users.forEach((u) => {
      items.push({
        id: u.id,
        values: [u.username, u.email, u.scope, ""],
        icon: <Avatar src={u.avatar} size={36} />,
      });
    });

    let menu;
    if (scope === "admin") {
      menu = [
        {
          name: "edit",
          onSelect: this.handleMenuSelect,
        },
        {
          name: "state",
          onSelect: this.handleMenuSelect,
        },
        {
          name: "delete",
          onSelect: this.handleMenuSelect,
          disabled: true,
        },
      ];
    }

    return (
      <React.Fragment>
        <Grid>
          <Inner>
            <Cell span={12}>
              <Panel
                icon={
                  <svg viewBox="0 0 24 24">
                    <path d="M12,6A3,3 0 0,0 9,9A3,3 0 0,0 12,12A3,3 0 0,0 15,9A3,3 0 0,0 12,6M6,8.17A2.5,2.5 0 0,0 3.5,10.67A2.5,2.5 0 0,0 6,13.17C6.88,13.17 7.65,12.71 8.09,12.03C7.42,11.18 7,10.15 7,9C7,8.8 7,8.6 7.04,8.4C6.72,8.25 6.37,8.17 6,8.17M18,8.17C17.63,8.17 17.28,8.25 16.96,8.4C17,8.6 17,8.8 17,9C17,10.15 16.58,11.18 15.91,12.03C16.35,12.71 17.12,13.17 18,13.17A2.5,2.5 0 0,0 20.5,10.67A2.5,2.5 0 0,0 18,8.17M12,14C10,14 6,15 6,17V19H18V17C18,15 14,14 12,14M4.67,14.97C3,15.26 1,16.04 1,17.33V19H4V17C4,16.22 4.29,15.53 4.67,14.97M19.33,14.97C19.71,15.53 20,16.22 20,17V19H23V17.33C23,16.04 21,15.26 19.33,14.97Z" />
                  </svg>
                }
                title="Team & Collaborators"
                action={user.attributes.scope === "admin" ? "Add" : undefined}
                description="Manage user's access, rights, role. Add new one or delete/revoke another."
                onAction={() => {
                  this.setState({
                    displayAddUserDialog: true,
                    authError: null,
                  });
                }}
              >
                <div className="zap-panel_scroll">
                  <TableComponent
                    items={items}
                    selectedItem={-1}
                    onSelect={() => {}}
                    menu={menu}
                  />
                </div>
              </Panel>
            </Cell>
          </Inner>
        </Grid>
        {this.state.displayAddUserDialog && this.renderAddUserDialog()}
        {this.state.displayEditUserDialog && this.renderEditUserDialog()}
        {this.state.displayEditStateDialog && this.renderEditStateDialog()}
      </React.Fragment>
    );
  }
}

Users.defaultProps = {
  profile: {},
  user: null,
  users: [],
  onSelect: () => {},
  isLoading: false,
};

Users.propTypes = {
  profile: PropTypes.shape({}),
  user: PropTypes.shape({}),
  users: PropTypes.array,
  apiGetUsersRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  createUser: PropTypes.func,
  provider: PropTypes.string,
  authError: PropTypes.string,
  userError: PropTypes.string,
  apiAdminUpdateProfileRequest: PropTypes.func,
  adminUpdateAccountStateRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const { error: appError, loading: appLoading, users } = state.app;
  const { error: userError, loading: userLoading, profile } = user;
  const { error: authError, newUserLoading, loading: authLoading } = state.auth;

  const error = userError || appError;

  return {
    user,
    profile,
    users,
    isLoading: newUserLoading || userLoading || appLoading || authLoading,
    authError: authError && authError.message,
    userError: error && error.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  apiGetUsersRequest: () => dispatch(apiGetUsersRequest()),
  createUser: (provider, username, email, password) => {
    dispatch(
      createUserRequest({
        provider,
        username,
        email,
        password,
        accept: true,
      }),
    );
  },
  apiAdminUpdateProfileRequest: (profile, userId) => {
    dispatch(apiAdminUpdateProfileRequest(profile, userId));
  },
  adminUpdateAccountStateRequest: (newState, userId) => {
    dispatch(adminUpdateAccountStateRequest(newState, userId));
  },
});

export { Users as UsersBase };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
