/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Zrmc, { Grid, Inner, Cell, Button, TextField } from "zrmc";
import { connect } from "react-redux";
import {
  apiSetAdminParametersRequest,
  apiAdminUpdateRequest,
} from "../../actions/api";
import TunnelBox from "../../components/tunnelBox";
import { infoStyleD, FORM_WIDTH } from "./styles";

class Advanced extends Component {
  constructor(props) {
    super(props);

    const emailServer = props.admin.params.emailServer || {
      host: "",
      port: "",
      clientId: "",
      clientSecret: "",
    };

    const backend = props.admin.params.backend || {
      apiUrl: "",
      authUrl: "",
      clientId: "",
      clientSecret: "",
    };

    this.state = {
      tunnelParams: null,
      backendParams: {
        publicUrl: "",
        apiUrl: backend.apiUrl || "",
        authUrl: backend.authUrl || "",
        clientId: backend.clientId || "",
        clientSecret: backend.clientSecret || "",
      },
      emailServerParams: {
        host: emailServer.host || "",
        port: emailServer.port || "",
        username: emailServer.username || "",
        password: emailServer.password || "",
      },
    };
  }

  static onActionTunnel(/* dialog, action */) {
    Zrmc.closeDialog();
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
    const { params } = this.props.admin;
    const backend = this.state.backendParams || params.backend || {};
    const tunnelParams = this.state.tunnelParams || backend.tunnel || {};
    const body = (
      <TunnelBox onChange={this.onChangeTunnel} params={tunnelParams} />
    );
    Zrmc.showDialog({
      header: "Tunnel settings",
      body,
      syle: { width: "520px" },
      onAction: Advanced.onActionTunnel,
    });
  }

  onEmailParamsChange = (field, e) => {
    const { value } = e.currentTarget;

    this.setState((prevState) => ({
      emailServerParams: {
        ...prevState.emailServerParams,
        [field]: value,
      },
    }));
  };

  onSaveEmailParams = () => {
    const params = this.state.emailServerParams;

    if (
      params.host.length === 0 ||
      params.port.length === 0 ||
      params.username.length === 0 ||
      params.password.length === 0
    ) {
      Zrmc.showDialog({
        header: "email settings",
        body: "all parameters are mandatory",
        syle: { width: "520px" },
      });
      return;
    }

    this.props.apiAdminUpdateRequest({
      emailServer: params,
    });

    Zrmc.showDialog({
      header: "email settings",
      body: "parameters saved",
      syle: { width: "520px" },
    });
  };

  render() {
    const emailServer = this.state.emailServerParams;
    const backend = this.state.backendParams;
    const { user } = this.props;
    // const tunnelParams = this.state.tunnelParams || backend.tunnel || {};
    /* const hasTunnelParams = !!this.state.tunnelParams; */
    const publicApiUrlDisabled = user.attributes.scope === "owner";
    const backendConfig = (
      <Inner>
        <Cell className="mdl-color--white" span={12}>
          <div style={infoStyleD}>
            Backend configuration
            <Button
              raised
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
                disabled={publicApiUrlDisabled}
                style={{ width: FORM_WIDTH }}
                defaultValue={backend.publicUrl}
                trailingIcon="link"
                onClickTI={this.displayTunnelDialog}
              />
            </div>
            <div>
              <TextField
                onChange={() => {}}
                label="Api url"
                disabled
                style={{ width: FORM_WIDTH }}
                defaultValue={backend.apiUrl}
              />
            </div>
            <div>
              <TextField
                onChange={() => {}}
                label="Auth url"
                disabled
                style={{ width: FORM_WIDTH }}
                defaultValue={backend.authUrl}
              />
            </div>
            <div>
              <TextField
                onChange={() => {}}
                label="AppId"
                disabled
                style={{ width: FORM_WIDTH }}
                defaultValue={backend.clientId}
              />
            </div>
            <div>
              <TextField
                onChange={() => {}}
                label="Secret"
                disabled
                style={{ width: FORM_WIDTH }}
                defaultValue={backend.clientSecret}
              />
            </div>
          </form>
          <div />
        </Cell>
      </Inner>
    );

    let emailConfig = null;
    if (user.attributes.scope === "admin") {
      emailConfig = (
        <Inner>
          <Cell className="mdl-color--white" span={12}>
            <div style={infoStyleD}>
              Email server configuration
              <Button
                raised
                style={{ float: "right" }}
                onClick={(e) => {
                  e.preventDefault();
                  this.onSaveEmailParams();
                }}
              >
                SAVE
              </Button>
            </div>
            <form style={infoStyleD} autoComplete="nope">
              <div>
                <TextField
                  onChange={(e) => this.onEmailParamsChange("host", e)}
                  label={
                    emailServer.address
                      ? "Server address"
                      : "Server address (e.g.: smtp.example.com)"
                  }
                  style={{ width: FORM_WIDTH }}
                  defaultValue={emailServer.host}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => this.onEmailParamsChange("port", e)}
                  label={
                    emailServer.port ? "Server port" : "Server port (e.g.: 587)"
                  }
                  style={{ width: FORM_WIDTH }}
                  defaultValue={emailServer.port}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => this.onEmailParamsChange("username", e)}
                  label="Username"
                  autoComplete="new-password"
                  style={{ width: FORM_WIDTH }}
                  defaultValue={emailServer.username}
                />
              </div>
              <div>
                <TextField
                  onChange={(e) => this.onEmailParamsChange("password", e)}
                  label="Password"
                  autoComplete="new-password"
                  type="password"
                  style={{ width: FORM_WIDTH }}
                />
              </div>
            </form>
            <div />
          </Cell>
        </Inner>
      );
    }

    return (
      <Grid>
        {backendConfig}
        {emailConfig}
        {this.props.children}
      </Grid>
    );
  }
}

Advanced.defaultProps = {
  admin: null,
  user: null,
};

Advanced.propTypes = {
  admin: PropTypes.shape({
    params: PropTypes.shape({
      emailServer: PropTypes.shape({}),
      backend: PropTypes.shape({}),
    }).isRequired,
  }),
  apiSetAdminParametersRequest: PropTypes.func.isRequired,
  apiAdminUpdateRequest: PropTypes.func.isRequired,
  children: PropTypes.element,
  user: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { admin } = state.app;
  const { user } = state;

  return {
    admin,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  apiSetAdminParametersRequest: (params) => {
    dispatch(apiSetAdminParametersRequest(params));
  },
  apiAdminUpdateRequest: (params) => {
    dispatch(apiAdminUpdateRequest(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Advanced);
