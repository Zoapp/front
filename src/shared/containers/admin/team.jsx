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
import { apiGetUsersRequest } from "../../actions/api";
import { createUserRequest } from "../../actions/auth";
import Avatar from "../../components/avatar";
import Panel from "../../components/panel";
import SignUp from "../../components/auth/signUp";

class Users extends Component {
  state = {
    displayAddUserPanel: false,
    newUser: {},
    isLoading: false,
  };

  componentDidMount() {
    this.props.apiGetUsersRequest();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isLoading && !props.isLoading) {
      const newState = {
        ...state,
        isLoading: false,
      };
      if (!props.error) {
        props.apiGetUsersRequest();
        newState.displayAddUserPanel = false;
      }
      return newState;
    }
    return state;
  }

  handleCreateUser = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state.newUser;
    this.setState({ isLoading: true });
    this.props.createUser(this.props.provider, username, email, password);
  };

  createChangeHandler = (field) => (e) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [field]: e.target.value,
      },
    });
  };

  render() {
    const items = [];
    const status = "you";
    const { user, profile, users, menu, onSelect } = this.props;

    const { isLoading } = this.state;
    const { username, email, password } = this.state.newUser;

    const values = [];
    values.push(profile.username);
    values.push(profile.email);
    values.push(user.attributes.scope);
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
                  this.setState({ displayAddUserPanel: true });
                }}
              >
                <div className="zap-panel_scroll">
                  <TableComponent
                    items={items}
                    selectedItem={-1}
                    onSelect={onSelect}
                    menu={menu}
                  />
                </div>
              </Panel>
            </Cell>
          </Inner>
        </Grid>
        {this.state.displayAddUserPanel && (
          <form id="signin-dialog-form" onSubmit={this.handleCreateUser}>
            <Dialog
              id="admin-add-user"
              onClose={() => {
                this.setState({ displayAddUserPanel: false });
              }}
              header="Add user"
              width="320px"
            >
              <SignUp
                username={username}
                email={email}
                password={password}
                createChangeHandler={this.createChangeHandler}
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
                  key="but_sign"
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
        )}
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
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  createUser: PropTypes.func,
  provider: PropTypes.string,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const { users } = state.app;
  const profile = user ? user.profile : null;
  const { error, newUserLoading } = state.auth;

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
    isLoading: newUserLoading || user.loading,
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
});

export { Users as UsersBase };
export default connect(mapStateToProps, mapDispatchToProps)(Users);
