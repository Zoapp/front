/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Inner, Cell } from "zrmc";
import { connect } from "react-redux";
import { TableComponent } from "zoapp-ui";
import { apiGetUsersRequest } from "../../actions/api";
import Panel from "../../components/panel";

class Users extends Component {
  componentDidMount() {
    this.props.apiGetUsersRequest();
  }

  render() {
    const items = [];
    const status = "you";
    const { user, profile, users, menu, onSelect } = this.props;

    const values = [];
    values.push(profile.username);
    values.push(profile.email);
    values.push(user.attributes.scope);
    values.push(status);

    items.push({ id: 1, values, icon: `../images/${profile.avatar}.png` });

    users.forEach((u) => {
      items.push({
        id: u.id,
        values: [u.username, u.email, u.scope, ""],
        icon: `../images/${u.avatar}.png`,
      });
    });

    return (
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
              action="Add"
              description="Manage user's access, rights, role. Add new one or delete/revoke another."
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
    );
  }
}

Users.defaultProps = {
  profile: {},
  user: null,
  users: [],
  onSelect: () => {},
};

Users.propTypes = {
  profile: PropTypes.shape({}),
  user: PropTypes.shape({}),
  users: PropTypes.array,
  apiGetUsersRequest: PropTypes.func,
  menu: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const { users } = state.app;
  const profile = user ? user.profile : null;

  return {
    user,
    profile,
    users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  apiGetUsersRequest: () => dispatch(apiGetUsersRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
