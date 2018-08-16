/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Zrmc, {
  Button,
  Content,
  Fab,
  Icon,
  Snackbar,
  Tabbar,
  Tab,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarIcon,
  Drawer,
  DrawerHeader,
  DrawerContent,
} from "zrmc";
import { DrawerFooter } from "zoapp-ui";
import PropTypes from "prop-types";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";

import Screen from "./screen";
import UserBox from "./userBox";
import SignInForm from "./signInForm";
import { appSetTitle } from "../actions/app";
import { removeMessage } from "../actions/message";
import { initAuthSettings } from "../actions/initialize";
import { apiAdminRequest } from "../actions/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      type: drawer,
      above: aboveToolbar,
      themeDark: drawerThemeDark,
    } = props.design.drawer;
    const { theme: toolbarTheme } = props.design.toolbar;
    this.state = {
      needUpdate: true,
      activeTab: props.activeTab,
      drawer,
      drawerOpen: false,
      drawerThemeDark,
      toolbarTheme,
      aboveToolbar,
    };
  }

  componentDidMount() {
    this.props.initAuthSettings();
    this.updateAdmin();
    Zrmc.init(this, { typography: true });
  }

  componentDidUpdate() {
    this.updateAdmin();
  }

  onMenuClick = (event) => {
    event.preventDefault();
    this.toggleDrawer();
  };

  updateAdmin() {
    if (!this.props.isSignedIn) {
      if (!this.state.needUpdate) {
        this.setState({ needUpdate: true });
      }
      return;
    }
    if (this.state.needUpdate) {
      this.setState({ needUpdate: false });
      this.props.apiAdminRequest();
    }
  }

  handleTimeoutError() {
    this.todo = {};
  }

  handleToolbarTabChange = (name, index) => {
    this.setState({ activeTab: index });
    // console.log("change activeTab", this.state.activeTab, index);
  };

  handleDisplayScreen = () => {
    this.setState({ activeTab: 0 });
    // console.log("activeTab", this.state.activeTab);
  };

  handleDrawerItemClick = () => {
    if (this.state.drawer === "temporary") {
      this.toggleDrawer();
    }
  };

  toggleDrawer = () => {
    const open = !this.state.drawerOpen;
    this.setState({ drawerOpen: open });
  };

  renderSnackbar = () => {
    const { message } = this.props;
    if (message) {
      return (
        <Snackbar
          message={message}
          onTimeout={() => {
            this.props.removeMessage();
          }}
        />
      );
    }
    return null;
  };

  render() {
    let icon;
    if (this.state.drawer !== "permanent") {
      icon = <ToolbarIcon name="menu" onClick={this.onMenuClick} />;
    }
    let { isLoading } = this.props;
    const {
      design,
      screens,
      titleName,
      appName,
      appSubname,
      isSignedIn,
    } = this.props;
    if (!isLoading && !this.props.admin && isSignedIn) {
      isLoading = true;
    }
    const drawerContentItems = [];
    const routes = [];
    let currentScreen = null;
    let isFullscreen = false;

    screens.forEach((screen) => {
      if (
        screen.isDrawerItem &&
        (screen.access === "all" ||
          (isSignedIn && screen.access === "auth") ||
          (!isSignedIn && screen.access === "public"))
      ) {
        let activated = false;
        if (titleName === screen.name) {
          activated = true;
        }
        drawerContentItems.push({
          activated,
          ...screen,
        });
      }
      if (titleName === screen.name) {
        currentScreen = screen;
      }
      if (screen.path) {
        if (screen.path === "*" || screen.path === "/") {
          if (screen.path !== "/" || (screen.access === "auth" && isSignedIn)) {
            routes.push({ ...screen });
          }
        } else {
          routes.splice(0, 0, { ...screen });
        }
      }
    });

    const drawerFooter =
      design.drawer && design.drawer.renderFooter ? (
        <DrawerFooter>{design.drawer.renderFooter()}</DrawerFooter>
      ) : null;

    let tabbar;
    let toolbox;
    let fab;

    const { activeTab } = this.state;

    // console.log("render activeTab", activeTab);

    if (currentScreen) {
      if (currentScreen.isFullscreen != null) {
        // eslint-disable-next-line
        isFullscreen = currentScreen.isFullscreen;
      }
      if (isSignedIn || currentScreen.access !== "auth") {
        if (currentScreen.panels) {
          let ac = "var(--mdc-theme-text-primary-on-primary, white)";
          let c = "rgba(255, 255, 255, 0.54)";
          if (this.state.toolbarTheme === "white") {
            ac = "var(--mdc-theme-secondary, #018786)";
            c = "rgba(2, 206, 204, 0.54)";
          }
          tabbar = (
            <ToolbarSection style={{ padding: "0" }}>
              <Tabbar
                onChange={this.handleToolbarTabChange}
                activeTab={activeTab}
                color={c}
                activeColor={ac}
              >
                {currentScreen.panels.map((p, index) => {
                  const k = `t_${titleName}_${index}`;
                  return (
                    <Tab
                      key={k}
                      className={k}
                      style={{ minWidth: "80px", width: "80px" }}
                      ripple
                    >
                      {p}
                    </Tab>
                  );
                })}
              </Tabbar>
            </ToolbarSection>
          );
        }
        if (currentScreen.toolbox) {
          toolbox = (
            <ToolbarSection align="end">
              {currentScreen.toolbox.map((p, index) => {
                const k = `tb_${index}`;
                return (
                  <Button
                    key={k}
                    style={{
                      margin: "auto 48px auto auto",
                      backgroundColor: p.backgroundColor
                        ? p.backgroundColor
                        : "var(--mdc-theme-secondary, #018786)",
                      color: p.color ? p.color : "#000",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      p.onAction(p);
                    }}
                  >
                    {p.title}
                  </Button>
                );
              })}
            </ToolbarSection>
          );
        }
        if (currentScreen.fab) {
          fab = (
            <Fab
              icon={currentScreen.fab.icon}
              onClick={currentScreen.fab.onAction}
            />
          );
        }
      }
    }

    const mainContent = (
      <Content
        style={
          isFullscreen === true
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }
            : {}
        }
      >
        <Switch>
          {routes.map((screen) => (
            <Route
              key={screen.id}
              path={screen.path}
              render={(props) => {
                if (!isSignedIn && screen.access === "auth") {
                  return <SignInForm screen={screen} />;
                } else if (screen.render) {
                  return screen.render({
                    ...props,
                    screen,
                    activeTab,
                  });
                }
                return <Screen screen={screen}>{screen.name}</Screen>;
              }}
            />
          ))}
        </Switch>
      </Content>
    );

    if (isFullscreen === false) {
      let instance;
      const i = this.props.instance;
      if (i) {
        instance = (
          <span>
            {" "}
            - <span style={{ color: i.color }}>{i.name}</span>
          </span>
        );
      }
      const { project } = this.props;
      const projectname = isSignedIn && project.name ? project.name : appName;
      const subinfo = "";
      const projecticon = project.icon || "./images/default.png";
      return (
        <Content>
          <Toolbar
            className={`mdc-toolbar--theme-${this.state.toolbarTheme}`}
            fixed
          >
            <ToolbarRow>
              <ToolbarSection align="start">
                {icon}
                <ToolbarTitle>
                  {this.props.design.minTitleName ? (
                    ""
                  ) : (
                    <span style={{ fontWeight: "900" }}>
                      {appName} {appSubname} {instance} /{" "}
                    </span>
                  )}
                  <span>{titleName}</span>
                </ToolbarTitle>
              </ToolbarSection>
              {tabbar}
              {toolbox}
              <UserBox store={this.props.store} />
            </ToolbarRow>
          </Toolbar>
          <Drawer
            type={this.state.drawer}
            open={this.state.drawerOpen}
            above={this.state.aboveToolbar}
            onClose={this.toggleDrawer}
            themeDark={this.state.drawerThemeDark}
          >
            <DrawerHeader
              style={{
                backgroundColor: project.backgroundColor
                  ? project.backgroundColor
                  : null,
                color: project.color ? project.color : null,
              }}
            >
              <img
                src={projecticon}
                className="mdc-drawer__drawer_header_icon"
              />{" "}
              <div>{projectname}</div>
              <div>{subinfo}</div>
            </DrawerHeader>
            <DrawerContent list>
              {drawerContentItems.map((item) => {
                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={this.handleDrawerItemClick}
                      target="_blank"
                      rel="noreferrer noopener"
                      icon={item.icon}
                    >
                      {item.name}
                      <Icon
                        name="launch"
                        style={{
                          paddingLeft: "8px",
                          fontSize: "18px",
                          opacity: "0.6",
                        }}
                      />
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.id}
                    href={`#${item.name}`}
                    onClick={() => {
                      this.handleDrawerItemClick();
                      this.handleDisplayScreen();
                    }}
                    to={item.path === "*" ? "/" : item.path}
                    activated={item.activated}
                    icon={item.icon}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </DrawerContent>
            {drawerFooter}
          </Drawer>
          {mainContent}
          {fab}
          {this.renderSnackbar()}
        </Content>
      );
    }
    return (
      <Content>
        {mainContent}
        {fab}
        {this.renderSnackbar()}
      </Content>
    );
  }
}

App.defaultProps = {
  message: null,
  admin: null,
  appName: "",
  appSubname: "",
  instance: null,
  project: {},
  screens: [],
  design: { drawer: { type: "permanent" } },
  activeTab: 0,
};

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  titleName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  admin: PropTypes.shape({}),
  appName: PropTypes.string,
  appSubname: PropTypes.string,
  instance: PropTypes.shape({}),
  project: PropTypes.shape({}),
  message: PropTypes.string,
  screens: PropTypes.arrayOf(PropTypes.shape({})),
  design: PropTypes.shape({
    drawer: PropTypes.shape({ type: PropTypes.string }),
    minTitleName: PropTypes.bool,
    toolbar: PropTypes.shape({ theme: PropTypes.string }),
  }),
  initAuthSettings: PropTypes.func.isRequired,
  /* appSetTitle: PropTypes.func.isRequired, */
  apiAdminRequest: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

const mapStateToProps = (state) => {
  const {
    admin,
    screens,
    name,
    subname,
    instance,
    design,
    project,
  } = state.app;
  const { message } = state.message;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading =
    (state.app && state.app.loading) ||
    (state.auth && state.auth.loading) ||
    (state.user && state.user.loading);
  const titleName = state.app.titleName ? state.app.titleName : "";
  return {
    admin,
    isLoading,
    isSignedIn,
    titleName,
    screens,
    appName: name,
    appSubname: subname,
    instance,
    design,
    message,
    project,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetTitle: (titleName) => {
    dispatch(appSetTitle(titleName));
  },
  removeMessage: () => {
    dispatch(removeMessage());
  },
  initAuthSettings: () => {
    dispatch(initAuthSettings());
  },
  apiAdminRequest: () => {
    dispatch(apiAdminRequest());
  },
});

/* global module */
export default hot(module)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App)),
);
