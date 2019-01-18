/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Inner,
  Cell,
  Dialog,
  DialogFooter,
  DialogBody,
  Button,
  LinearProgress,
} from "zrmc";
import { connect } from "react-redux";
import { TableComponent } from "zoapp-ui";
import {
  apiGetUsersRequest,
  apiAdminUpdateProfileRequest,
} from "../../actions/api";
import { createUserRequest } from "../../actions/auth";
import Avatar from "../../components/avatar";
import Panel from "../../components/panel";
import SignUp from "../../components/auth/signUp";
import Loading from "../../components/loading";
import Settings from "../../components/settings";

class Users extends Component {
  state = {
    displayAddUserDialog: false,
    displayEditUserDialog: false,
    selectedUser: null,
    newUser: {},
    editProfile: {},
    isLoading: false,
    hasChanged: false,
  };

  componentDidMount() {
    this.props.apiGetUsersRequest();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isLoading && !props.isLoading) {
      const newState = {
        isLoading: false,
      };
      if (!props.error) {
        props.apiGetUsersRequest();
        newState.displayAddUserDialog = false;
        newState.displayEditUserDialog = false;
        newState.newUser = {};
        newState.editProfile = {};
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
      id: selectedUser.id,
      username: selectedUser.username,
      email: selectedUser.email,
      avatar: selectedUser.avatar,
    };

    profile = {
      ...profile,
      ...editProfile,
    };

    this.setState({ isLoading: true });
    this.props.apiAdminUpdateProfileRequest(profile);
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
    if (action === "edit") {
      // admin is not in the users props but present on table

      this.setState({
        displayEditUserDialog: userIndex > 0,
        selectedUser: this.props.users[userIndex - 1],
        hasChanged: false,
      });
    } else if (action === "delete") {
      // `TODO: delete user #${userIndex}`;
    }
  };

  renderAddUserDialog = () => {
    const { isLoading } = this.state;
    const { username, email, password } = this.state.newUser;

    return (
      <form id="signin-dialog-form" onSubmit={this.handleCreateUser}>
        <Dialog
          id="admin-add-user"
          onClose={() => {
            this.setState({ displayAddUserDialog: false });
          }}
          header="Add user"
          width="320px"
        >
          <SignUp
            username={username}
            email={email}
            password={password}
            createChangeHandler={this.createChangeHandler("newUser")}
            container={DialogBody}
            disabled={false}
          >
            {isLoading ? (
              <LinearProgress buffer={0} indeterminate />
            ) : (
              <div className="authenticate_error">{this.props.error}</div>
            )}
          </SignUp>
          <DialogFooter>
            <Button
              key="btn-create-user"
              type="submit"
              className="authenticate_submit"
              raised
              dense
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create user"}
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    );
  };

  renderEditUserDialog = () => {
    const { isLoading, selectedUser, hasChanged } = this.state;

    return (
      <form id="edit-dialog-form" onSubmit={this.handleEditUser}>
        <Dialog
          id="admin-edit-user"
          onClose={() => {
            this.setState({ displayEditUserDialog: false });
          }}
          header="Edit user"
        >
          <DialogBody>
            <Settings
              profile={selectedUser}
              onChangeHandler={this.createChangeHandler("editProfile")}
            />
            {isLoading ? (
              <LinearProgress buffer={0} indeterminate />
            ) : (
              <div className="authenticate_error">{this.props.error}</div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              key="btn-cancel"
              className="authenticate_submit"
              raised
              dense
              disabled={isLoading}
              onClick={() => this.setState({ displayEditUserDialog: false })}
            >
              Cancel
            </Button>
            <Button
              key="btn-edit-user"
              type="submit"
              className="authenticate_submit"
              raised
              dense
              disabled={isLoading || !hasChanged}
            >
              {isLoading ? "Processing..." : "Edit user"}
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
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
                  this.setState({ displayAddUserDialog: true });
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
  error: PropTypes.string,
  apiAdminUpdateProfileRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const { error: appError, loading: appLoading, users } = state.app;
  const { error: userError, loading: userLoading, profile } = user;
  const { error: authError, newUserLoading } = state.auth;

  const error = authError || userError || appError;

  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return {
    user,
    profile,
    users,
    isLoading: newUserLoading || userLoading || appLoading,
    error: errorMessage,
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
  apiAdminUpdateProfileRequest: (profile) => {
    dispatch(apiAdminUpdateProfileRequest(profile));
  },
});

export { Users as UsersBase };
export default connect(mapStateToProps, mapDispatchToProps)(Users);
