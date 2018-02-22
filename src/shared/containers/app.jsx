/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Rmdc, {
  Button, Content, Fab, Snackbar, Tabbar, Tab,
  Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon,
  Drawer, DrawerContent,
} from "zoapp-materialcomponents";
import PropTypes from "prop-types";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Screen from "./screen";
import UserBox from "./userBox";
import { appSetTitle } from "../actions/app";
import { initAuthSettings } from "../actions/initialize";
import { apiAdminRequest } from "../actions/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    const { type: drawer, above: aboveToolbar, themeDark: drawerThemeDark } = props.design.drawer;
    this.state = {
      needUpdate: true,
      activeTab: props.activeTab,
      drawer,
      drawerOpen: false,
      drawerThemeDark,
      aboveToolbar,
    };
  }

  componentDidMount() {
    this.props.initAuthSettings();
    this.updateAdmin();
    Rmdc.init(this, { typography: true });
  }

  componentDidUpdate() {
    this.updateAdmin();
  }

  onMenuClick = (event) => {
    event.preventDefault();
    this.toggleDrawer();
  }

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
  }

  handleDisplayScreen = () => {
    this.setState({ activeTab: 0 });
  }

  toggleDrawer = () => {
    const open = !this.state.drawerOpen;
    this.setState({ drawerOpen: open });
  }

  render() {
    let icon;
    if (this.state.drawer !== "permanent") {
      icon = <ToolbarIcon name="menu" onClick={this.onMenuClick} />;
    }
    let { isLoading } = this.props;
    if ((!isLoading) && (!this.props.admin) && this.props.isSignedIn) {
      isLoading = true;
    }
    let message = "Welcome";
    if (this.props.error) {
      message = this.props.error;
    }
    const items = [];
    const routes = [];
    const { screens, titleName, appName } = this.props;
    let currentScreen = null;
    screens.forEach((screen) => {
      if (screen.isDrawerItem && (screen.access === "all" ||
      (this.props.isSignedIn && screen.access === "auth") ||
      ((!this.props.isSignedIn) && screen.access === "public"))) {
        let activated = false;
        if (titleName === screen.name) {
          activated = true;
          currentScreen = screen;
        }
        items.push({
          activated, ...screen,
        });
      }
      if (screen.path) {
        if (screen.path === "*" || screen.path === "/") {
          routes.push({ ...screen });
        } else {
          routes.splice(0, 0, { ...screen });
        }
      }
    });
    let tabbar;
    let toolbox;
    let fab;
    if (currentScreen) {
      if (currentScreen.panels) {
        const ac = "var(--mdc-theme-text-primary-on-primary, white)";
        const c = "rgba(255, 255, 255, 0.54)";
        tabbar = (
          <ToolbarSection>
            <Tabbar
              onChange={this.handleToolbarTabChange}
              activeTab={this.state.activeTab}
              color={c}
              activeColor={ac}
            >
              {currentScreen.panels.map((p, index) => {
                const k = `t_${index}`;
                return (
                  <Tab
                    key={k}
                    style={{ minWidth: "80px", width: "80px" }}
                    ripple
                  >
                    {p}
                  </Tab>);
              })}
            </Tabbar>
          </ToolbarSection>);
      }
      if (currentScreen.toolbox) {
        toolbox = (
          <ToolbarSection align="end" >
            {currentScreen.toolbox.map((p, index) => {
              const k = `tb_${index}`;
              return (
                <Button
                  key={k}
                  raised
                  style={{ marginRight: "48px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    p.onAction(p);
                  }}
                >
                  {p.title}
                </Button>);
            })}
          </ToolbarSection>);
      }
      if (currentScreen.fab) {
        fab = <Fab icon={currentScreen.fab.icon} onClick={currentScreen.fab.onAction} />;
      }
    }
    return (
      <Content>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start" >
              {icon}
              <ToolbarTitle>
                <span style={{ fontWeight: "900" }}>{appName} / </span>
                <span style={{ color: "#ddd" }}>{titleName}</span>
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
          <DrawerContent list>
            {items.map(item => (
              <Link
                key={item.id}
                href={`#${item.name}`}
                onClick={this.handleDisplayScreen}
                to={item.path}
                activated={item.activated}
                icon={item.icon}
              >{item.name}
              </Link>))}
          </DrawerContent>
        </Drawer>
        <Content>
          <Switch>
            {routes.map(screen => (
              <Route
                key={screen.id}
                path={screen.path}
                render={(props) => {
                  if (screen.render) {
                    return screen.render({ ...props, screen, activeTab: this.state.activeTab });
                  }
                  return <Screen screen={screen}>{screen.name}</Screen>;
                }}
              />
            ))}
          </Switch>
        </Content>
        {fab}
        <Snackbar message={message} />
      </Content>
    );
  }
}

App.defaultProps = {
  error: null,
  admin: null,
  appName: "",
  screens: [],
  design: { drawer: { type: "permanent" } },
  activeTab: 0,
};

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  titleName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  admin: PropTypes.shape({}),
  appName: PropTypes.string,
  screens: PropTypes.arrayOf(PropTypes.shape({})),
  design: PropTypes.shape({
    drawer: PropTypes.shape({ type: PropTypes.string }),
  }),
  initAuthSettings: PropTypes.func.isRequired,
  /* appSetTitle: PropTypes.func.isRequired, */
  apiAdminRequest: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

const mapStateToProps = (state) => {
  const {
    admin, screens, name, design,
  } = state.app;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = (state.app && state.app.loading) ||
    (state.auth && state.auth.loading) || (state.user && state.user.loading);
  const titleName = state.app.titleName ? state.app.titleName : "";
  let error = null;
  if (state.app && state.app.error) {
    ({ error } = state.app);
  } else if (state.auth && state.auth.error) {
    ({ error } = state.auth);
  } else if ((!error) && state.user && state.user.error) {
    ({ error } = state.user);
  }
  return {
    admin, isLoading, isSignedIn, titleName, error, screens, appName: name, design,
  };
};

const mapDispatchToProps = dispatch => ({
  appSetTitle: (titleName) => {
    dispatch(appSetTitle(titleName));
  },
  initAuthSettings: () => {
    dispatch(initAuthSettings());
  },
  apiAdminRequest: () => {
    dispatch(apiAdminRequest());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
