/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Zrmc, { Grid, Inner, Cell, Button, Content, TextField } from "zrmc";
import { connect } from "react-redux";
import { TableComponent } from "zoapp-ui";
import { appSetTitle } from "../actions/app";
import { apiSetAdminParametersRequest } from "../actions/api";

import Loading from "../components/loading";
import SignInForm from "./signInForm";

// import PluginsManager from "../utils/pluginsManager";

const infoStyleD = {
  fontSize: "16px",
  fontWeight: "400",
  color: "#666",
  padding: "24px",
  lineHeight: "1.1",
};

class AdminManager extends Component {
  static onActionTunnel() {
    // console.log("onActionTunnel", dialog, action);
    Zrmc.closeDialog();
  }

  constructor(props) {
    super(props);
    // const pluginsManager = new PluginsManager();
    this.state = {
      // pluginsManager,
      tunnelParams: null,
      backendParams: null,
      emailServerParams: null,
    };
    this.props.appSetTitle("Admin");
  }

  onChangeTunnel = (tunnelParams) => {
    this.setState({ tunnelParams });
  };

  onSaveBackend() {
    if (this.state.tunnelParams) {
      // WIP save tunnel parameters
      const tunnel = this.state.tunnelParams.active || "None";
      this.setState({ tunnelParams: null });
      this.props.apiSetAdminParametersRequest({ tunnel });
    }
  }

  displayTunnelDialog() {
    this.todo = {};
    // const { params } = this.props.admin;
    // const backend = this.state.backendParams || params.backend || { };
    // const tunnelParams = this.state.tunnelParams || backend.tunnel || { };
    /* const content = <div>Tunnel</div>;
    Zrmc.showDialog({
      title: "Tunnel settings",
      content,
      width: "520px",
      onAction: AdminManager.onActionTunnel,
    }); */
  }

  render() {
    let { isLoading } = this.props;
    if (!isLoading && !this.props.admin && this.props.isSignedIn) {
      isLoading = true;
    }
    if (!this.props.isSignedIn) {
      return <SignInForm />;
    } else if (isLoading || this.props.admin == null) {
      return <Loading />;
    }
    const active = this.props.activeTab;
    let content = "";
    if (active === 0) {
      const saveDisabled = !this.state.botParams;
      content = (
        <Grid>
          <Cell
            className="mdl-color--white"
            col={12}
            style={{ display: "table" }}
          >
            <div style={{ width: "200px", display: "table-cell" }}>
              <div
                style={{
                  position: "absolute",
                  width: "180px",
                  height: "180px",
                  margin: "24px",
                  backgroundColor: "#ddd",
                }}
              />
            </div>
            <div style={{ display: "table-cell" }}>TODO</div>
            <div>
              <Button
                raised
                colored
                disabled={saveDisabled}
                style={{ float: "right", margin: "24px" }}
              >
                SAVE
              </Button>
            </div>
          </Cell>
        </Grid>
      );
    } else if (active === 1) {
      content = (
        <Grid>
          <div>Services</div>
        </Grid>
      );
    } else if (active === 2) {
      const items = [];
      const status = "you";
      const { user, profile } = this.props;
      // const spanStyle = { width: "160px" };
      const values = [];
      values.push(profile.username);
      values.push(profile.email);
      values.push(user.attributes.scope);
      values.push(status);
      items.push({ id: 1, values, icon: `../images/${profile.avatar}.png` });
      const headers = ["", "username", "email", "role", "status"];
      const title = (
        <div style={infoStyleD}>
          You could give an access to your collaborators here.
          <Button
            raised
            colored
            style={{ float: "right", marginBottom: "24px" }}
          >
            ADD
          </Button>
        </div>
      );
      content = (
        <Grid>
          <Inner>
            <Cell className="mdl-color--white" span={12}>
              <div>
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
    } else if (active === 3) {
      const { params } = this.props.admin;
      const emailServer = this.state.emailParams || params.emailServer || {};
      const backend = this.state.backendParams || params.backend || {};
      // const tunnelParams = this.state.tunnelParams || backend.tunnel || {};
      // const hasTunnelParams = !!this.state.tunnelParams;
      const saveBackendDisabled = !(
        this.state.backendParams || this.state.tunnelParams
      );
      const saveEmailDisabled = !this.state.emailServerParams;
      content = (
        <Grid>
          <Cell className="mdl-color--white" col={12}>
            <div style={infoStyleD}>
              Backend configuration
              <Button
                raised
                colored
                disabled={saveBackendDisabled}
                style={{ float: "right" }}
                onClick={(e) => {
                  e.preventDefault();
                  this.onSaveBackend();
                }}
              >
                SAVE
              </Button>
            </div>
            <form style={infoStyleD}>
              <div style={{ width: "520px" }}>
                <TextField
                  onChange={() => {}}
                  label="Public Api url"
                  style={{ width: "400px" }}
                  value={backend.publicUrl}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="Api url"
                  disabled
                  style={{ width: "400px" }}
                  value={backend.apiUrl}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="Auth url"
                  disabled
                  style={{ width: "400px" }}
                  value={backend.authUrl}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="AppId"
                  disabled
                  style={{ width: "400px" }}
                  value={backend.clientId}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="Secret"
                  disabled
                  style={{ width: "400px" }}
                  value={backend.clientSecret}
                />
              </div>
            </form>
            <div />
          </Cell>
          <Cell className="mdl-color--white" col={12}>
            <div style={infoStyleD}>
              Email server configuration<Button
                raised
                colored
                disabled={saveEmailDisabled}
                style={{ float: "right" }}
              >
                SAVE
              </Button>
            </div>
            <form style={infoStyleD} autoComplete="nope">
              <div>
                <TextField
                  onChange={() => {}}
                  label="Server address"
                  style={{ width: "400px" }}
                  value={emailServer.url}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="Username"
                  autoComplete="new-password"
                  style={{ width: "400px" }}
                  value={emailServer.username}
                />
              </div>
              <div>
                <TextField
                  onChange={() => {}}
                  label="Password"
                  autoComplete="new-password"
                  type="password"
                  style={{ width: "400px" }}
                  value={emailServer.password}
                />
              </div>
            </form>
            <div />
          </Cell>
          <Cell className="mdl-color--white" col={12}>
            <div style={infoStyleD}>
              <span style={{ color: "#d50000" }}>Delete this assistant</span>
              <Button
                raised
                colored
                style={{
                  float: "right",
                  marginBottom: "24px",
                  backgroundColor: "#d50000",
                }}
              >
                DELETE
              </Button>
            </div>
            <div />
          </Cell>
        </Grid>
      );
    }
    return (
      <Content className="mdl-color--grey-100">
        <section>{content}</section>
      </Content>
    );
  }
}

AdminManager.defaultProps = {
  admin: null,
  isLoading: false,
  isSignedIn: false,
  user: null,
  profile: {},
  activeTab: 0,
};

AdminManager.propTypes = {
  admin: PropTypes.shape({ params: PropTypes.shape({}).isRequired }),
  isLoading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  user: PropTypes.shape({}),
  activeTab: PropTypes.number,
  appSetTitle: PropTypes.func.isRequired,
  apiSetAdminParametersRequest: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
};

AdminManager.contextTypes = {
  activeTab: PropTypes.number,
};

const mapStateToProps = (state) => {
  const { admin } = state.app;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = state.loading;
  const { user } = state;
  const profile = user ? user.profile : null;
  return {
    admin,
    isLoading,
    isSignedIn,
    user,
    profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetTitle: (titleName) => {
    dispatch(appSetTitle(titleName));
  },
  apiSetAdminParametersRequest: (params) => {
    dispatch(apiSetAdminParametersRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminManager);
