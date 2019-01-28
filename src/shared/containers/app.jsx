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
import Authenticate from "./authenticate";
import { appSetScreen, appSetActiveTab } from "../actions/app";
import { removeMessage } from "../actions/message";
import { initAuthSettings } from "../actions/initialize";
import { apiAdminRequest, apiGetPluginsRequest } from "../actions/api";

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

  componentDidUpdate(prevProps) {
    this.updateAdmin();
    if (prevProps.selectedBotId !== this.props.selectedBotId) {
      this.props.apiGetPluginsRequest(this.props.selectedBotId);
    }
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
    this.props.appSetActiveTab(index);
  };

  handleDisplayScreen = () => {
    this.props.appSetActiveTab(0);
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
    const { message, type } = this.props.message;
    let snackProp = {};
    if (type === "info") {
      snackProp = {
        onAction: () => {
          this.props.removeMessage();
        },
        actionText: "Close",
        timeout: 60000,
      };
    }
    return (
      message && (
        <Snackbar
          message={message}
          onTimeout={() => {
            this.props.removeMessage();
          }}
          {...snackProp}
        />
      )
    );
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
      activeScreen,
      appName,
      appSubname,
      appIcon,
      isSignedIn,
      store,
    } = this.props;
    if (!isLoading && !this.props.admin && isSignedIn) {
      isLoading = true;
    }
    const { title, name } = activeScreen;
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
        if (name === screen.name) {
          activated = true;
        }
        drawerContentItems.push({
          activated,
          ...screen,
        });
      }
      if (name === screen.name) {
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

    const { activeTab } = this.props;

    if (currentScreen) {
      if (currentScreen.isFullscreen != null) {
        // eslint-disable-next-line
        isFullscreen = currentScreen.isFullscreen;
      }
      if (isSignedIn || currentScreen.access !== "auth") {
        if (currentScreen.panels) {
          tabbar = (
            <ToolbarSection style={{ padding: "0" }}>
              <Tabbar
                onChange={this.handleToolbarTabChange}
                activeTab={activeTab}
              >
                {currentScreen.panels.map((p, index) => {
                  const k = `t_${title}_${index}`;
                  return (
                    <Tab key={k} className={k} ripple>
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
              render={(p) => {
                if (!isSignedIn && screen.access === "auth") {
                  return <Authenticate screen={screen} />;
                } else if (screen.render) {
                  const props = { ...p, store };
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
      const projecticon = project.icon || appIcon;
      let header;
      if (
        this.props.design.drawer &&
        this.props.design.drawer.header &&
        this.props.design.drawer.header.href
      ) {
        header = (
          <Link
            href={this.props.design.drawer.header.href}
            to={this.props.design.drawer.header.href}
            onClick={() => {
              this.handleDrawerItemClick();
              this.handleDisplayScreen();
            }}
          >
            <img src={projecticon} className="mdc-drawer__drawer_header_icon" />{" "}
            <div>{projectname}</div>
            <div>{subinfo}</div>
          </Link>
        );
      } else {
        header = (
          <div>
            <img src={projecticon} className="mdc-drawer__drawer_header_icon" />{" "}
            <div>{projectname}</div>
            <div>{subinfo}</div>
          </div>
        );
      }
      const userbox = (
        <UserBox
          store={this.props.store}
          needsAuth={currentScreen && currentScreen.access === "auth"}
        />
      );
      return (
        <Content>
          <Toolbar
            className={`mdc-toolbar--theme-${this.state.toolbarTheme}`}
            fixed
          >
            <ToolbarRow>
              <ToolbarSection align="start" shrinkToFit={!!tabbar}>
                {icon}
                <ToolbarTitle>
                  {this.props.design.minTitleName ? (
                    ""
                  ) : (
                    <span style={{ fontWeight: "900" }}>
                      {appName} {appSubname} {instance} /{" "}
                    </span>
                  )}
                  <span>{title}</span>
                </ToolbarTitle>
              </ToolbarSection>
              {tabbar}
              {toolbox}
              {userbox}
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
              {header}
            </DrawerHeader>
            <DrawerContent list>
              {drawerContentItems.map((item) => {
                const n = item.title || item.name;
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
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {n}
                        <Icon
                          name="launch"
                          style={{
                            lineHeight: "22px",
                            fontSize: "18px",
                            opacity: "0.6",
                          }}
                        />
                      </div>
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
                    {n}
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
  message: {},
  admin: null,
  appName: "",
  appSubname: "",
  appIcon: "images/default.png",
  instance: null,
  project: {},
  screens: [],
  design: { drawer: { type: "permanent" } },
  activeTab: 0,
};

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  activeScreen: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    name: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  admin: PropTypes.shape({}),
  appName: PropTypes.string,
  appSubname: PropTypes.string,
  appIcon: PropTypes.string,
  instance: PropTypes.shape({}),
  project: PropTypes.shape({}),
  message: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
  screens: PropTypes.arrayOf(PropTypes.shape({})),
  design: PropTypes.shape({
    drawer: PropTypes.shape({
      type: PropTypes.string,
      header: PropTypes.shape({ href: PropTypes.string }),
    }),
    minTitleName: PropTypes.bool,
    toolbar: PropTypes.shape({ theme: PropTypes.string }),
  }),
  initAuthSettings: PropTypes.func.isRequired,
  appSetActiveTab: PropTypes.func.isRequired,
  apiAdminRequest: PropTypes.func.isRequired,
  apiGetPluginsRequest: PropTypes.func.isRequired,
  selectedBotId: PropTypes.string,
  removeMessage: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

const mapStateToProps = (state) => {
  const {
    admin,
    screens,
    name,
    subname,
    icon,
    instance,
    design,
    project,
  } = state.app;
  const { message } = state;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading =
    (state.app && state.app.loading) ||
    (state.auth && state.auth.loading) ||
    (state.user && state.user.loading);
  const activeScreen = {
    title: state.app.activeScreen.title ? state.app.activeScreen.title : "",
    name: state.app.activeScreen.name ? state.app.activeScreen.name : "",
  };

  const { activeTab } = state.app;

  const selectedBotId = state.app ? state.app.selectedBotId : null;
  const plugins = state.app ? state.app.plugins : [];
  // create one screenPlugins entry by plugin middleware
  const screenPlugins = [];
  plugins.forEach((plugin) => {
    if (plugin.type === "View" && plugin.middlewares) {
      plugin.middlewares.forEach((middleware) => {
        screenPlugins.push({
          ...plugin,
          middleware,
          middlewares: undefined,
        });
      });
    }
  });

  const newScreens = [...screens];

  screenPlugins.forEach((screenPlugin) => {
    if (screenPlugin.middleware && screenPlugin.middleware.screen) {
      const addScreen = screenPlugin.middleware.screen;
      const position = newScreens.findIndex(
        (screen) => screen.id === addScreen.afterScreenId,
      );
      const index = position > -1 ? position + 1 : newScreens.length;

      newScreens.splice(index, 0, {
        id: newScreens.length + 2,
        isDrawerItem: false,
        name: "Plugin view",
        path: "#",
        access: "all",
        ...screenPlugin.middleware.screen,
      });
    }
  });

  return {
    admin,
    isLoading,
    isSignedIn,
    activeScreen,
    activeTab,
    screens: newScreens,
    appName: name,
    appSubname: subname,
    appIcon: icon,
    instance,
    design,
    message,
    project,
    selectedBotId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  appSetActiveTab: (activeTab) => {
    dispatch(appSetActiveTab(activeTab));
  },
  appSetScreen: (screen) => {
    dispatch(appSetScreen(screen));
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
  apiGetPluginsRequest: (botId) => {
    dispatch(apiGetPluginsRequest(botId));
  },
});

/* global module */
export default hot(module)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App)),
);
