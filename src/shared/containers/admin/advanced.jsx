/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the GPL v2.0+ license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Zrmc, {
  Grid,
  Inner,
  Cell,
  TextField,
  LinearProgress,
  FormField,
} from "zrmc";
import { connect } from "react-redux";
import {
  apiSetAdminParametersRequest,
  apiAdminUpdateRequest,
  apiAdminRequest,
} from "../../actions/api";
import Panel from "../../components/panel";
import TunnelBox from "../../components/tunnelBox";
import Loading from "../../components/loading";

class Advanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tunnelParams: null,
      backendParams: null,
      emailServerParams: null,
    };
  }

  static onActionTunnel(/* dialog, action */) {
    Zrmc.closeDialog();
  }

  componentDidMount() {
    this.props.apiAdminRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading && this.props.admin) {
      const { backend, emailServer } = this.props.admin;
      const defaultParams = emailServer.defaultParams || {};
      const auth = emailServer.auth || {};

      this.setState({
        backendParams: {
          publicUrl: backend.publicUrl || "",
          apiUrl: backend.apiUrl || "",
          authUrl: backend.authUrl || "",
          clientId: backend.clientId || "",
          clientSecret: backend.clientSecret || "",
        },
        emailServerParams: {
          host: emailServer.host || "",
          port: String(emailServer.port || ""),
          username: auth.user || "",
          password: "",
          from: defaultParams.from || "",
        },
      });
    }
  }

  onChangeTunnel = (tunnelParams) => {
    this.setState({ tunnelParams });
  };

  onSaveBackend = () => {
    if (this.state.tunnelParams) {
      // WIP save tunnel parameters
      const tunnel = this.state.tunnelParams.active || "None";
      this.setState({ tunnelParams: null });
      this.props.apiSetAdminParametersRequest({ tunnel });
    }
  };

  displayTunnelDialog = () => {
    const { admin: params } = this.props;
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
  };

  onEmailParamsChange = (field, e) => {
    const { value } = e.currentTarget;

    this.setState((prevState) => ({
      emailServerParams: {
        ...prevState.emailServerParams,
        [field]: value,
      },
    }));
  };

  isEmailParams = () => {
    const params = this.state.emailServerParams;
    return (
      params.host.length === 0 ||
      params.port.length === 0 ||
      params.username.length === 0 ||
      params.password.length === 0
    );
  };

  onSaveEmailParams = () => {
    const params = this.state.emailServerParams;
    if (this.isEmailParams()) {
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
  };

  render() {
    const { user, isLoading } = this.props;
    const emailServer = this.state.emailServerParams;
    const backend = this.state.backendParams;
    if (isLoading || !emailServer || !backend) {
      return <Loading />;
    }
    let backendConfig;
    let emailConfig;
    if (user.attributes.scope === "admin") {
      // const tunnelParams = this.state.tunnelParams || backend.tunnel || {};
      /* const hasTunnelParams = !!this.state.tunnelParams; */
      // const publicApiUrlDisabled = user.attributes.scope === "owner";
      const publicApiUrlDisabled = true; // Will make this editable when we need.
      backendConfig = (
        <Inner>
          <Cell span={12}>
            <Panel
              icon={
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z"
                  />
                </svg>
              }
              title="Backend configuration"
              action="Save"
              onAction={this.onSaveBackend}
              actionDisabled
              description="Informations about Api and Authentification"
            >
              <form className="zap-panel_form">
                <div>
                  <TextField
                    onChange={() => {}}
                    label="Public Api url"
                    disabled={publicApiUrlDisabled}
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
                    defaultValue={backend.apiUrl}
                  />
                </div>
                <div>
                  <TextField
                    onChange={() => {}}
                    label="Auth url"
                    disabled
                    defaultValue={backend.authUrl}
                  />
                </div>
                <div>
                  <TextField
                    onChange={() => {}}
                    label="AppId"
                    disabled
                    defaultValue={backend.clientId}
                  />
                </div>
                <div>
                  <TextField
                    onChange={() => {}}
                    label="Secret"
                    disabled
                    defaultValue={backend.clientSecret}
                  />
                </div>
              </form>
            </Panel>
          </Cell>
        </Inner>
      );

      emailConfig = (
        <Inner>
          <Cell span={12}>
            <Panel
              icon={
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                  />
                </svg>
              }
              title="Email server configuration"
              action="Save"
              onAction={this.onSaveEmailParams}
              actionDisabled={isLoading}
              description="Setup the SMTP server"
            >
              <form className="zap-panel_form" autoComplete="nope">
                <FormField style={{ display: "block" }}>
                  <TextField
                    onChange={(e) => this.onEmailParamsChange("host", e)}
                    label={
                      emailServer.address
                        ? "Server address"
                        : "Server address (e.g.: smtp.example.com)"
                    }
                    defaultValue={emailServer.host}
                  />
                </FormField>
                <FormField style={{ display: "block" }}>
                  <TextField
                    onChange={(e) => this.onEmailParamsChange("port", e)}
                    label={
                      emailServer.port
                        ? "Server port"
                        : "Server port (e.g.: 587)"
                    }
                    defaultValue={emailServer.port}
                  />
                </FormField>
                <FormField style={{ display: "block" }}>
                  <TextField
                    onChange={(e) => this.onEmailParamsChange("username", e)}
                    label="Username"
                    autoComplete="new-password"
                    defaultValue={emailServer.username}
                  />
                </FormField>
                <FormField style={{ display: "block" }}>
                  <TextField
                    onChange={(e) => this.onEmailParamsChange("password", e)}
                    label="Password"
                    autoComplete="new-password"
                    type="password"
                  />
                </FormField>
                <FormField style={{ display: "block" }}>
                  <TextField
                    onChange={(e) => this.onEmailParamsChange("from", e)}
                    label="From email"
                    defaultValue={emailServer.from}
                  />
                </FormField>
                {isLoading && <LinearProgress buffer={0} indeterminate />}
              </form>
            </Panel>
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
  isLoading: false,
};

Advanced.propTypes = {
  admin: PropTypes.shape({
    emailServer: PropTypes.shape({}).isRequired,
    backend: PropTypes.shape({}).isRequired,
  }),
  apiSetAdminParametersRequest: PropTypes.func.isRequired,
  apiAdminUpdateRequest: PropTypes.func.isRequired,
  apiAdminRequest: PropTypes.func.isRequired,
  children: PropTypes.element,
  user: PropTypes.shape({}),
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { admin, loading: isLoading } = state.app;
  const { user } = state;

  return {
    admin: admin.params,
    user,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  apiSetAdminParametersRequest: (params) => {
    dispatch(apiSetAdminParametersRequest(params));
  },
  apiAdminUpdateRequest: (params) => {
    dispatch(apiAdminUpdateRequest(params));
  },
  apiAdminRequest: () => {
    dispatch(apiAdminRequest());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Advanced);
