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
import { apiGetUsersRequest } from "../../actions/api";

class Users extends Component {
  componentDidMount() {
    this.props.apiGetUsersRequest();
  }

  render() {
    const items = [];
    const status = "you";
    const { user, profile, users } = this.props;

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

    const headers = ["", "username", "email", "role", "status"];
    const title = (
      <div className="zap-panel_title">
        You could give an access to your collaborators here.
        <Button>ADD</Button>
      </div>
    );

    return (
      <Grid>
        <Inner>
          <Cell className="zui-color--white" span={12}>
            <div className="zap-panel">
              <TableComponent
                title={title}
                headers={headers}
                items={items}
                selectedItem={-1}
                onSelect={() => {}}
              />
            </div>
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
};

Users.propTypes = {
  profile: PropTypes.shape({}),
  user: PropTypes.shape({}),
  users: PropTypes.array,
  apiGetUsersRequest: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
