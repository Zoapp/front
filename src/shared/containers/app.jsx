/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
// import { Layout, Header, Drawer, Navigation, IconButton, Menu, MenuItem } from "react-mdl";
import Rmdc, {
  Content, Fab, Snackbar, Tabbar, Tab,
  Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon,
  Drawer, DrawerContent,
  ListItem,
  Dialog,
} from "react-material-cw";
import PropTypes from "prop-types";
import { /* Link, Route, Switch, */ withRouter } from "react-router-dom";
import { connect } from "react-redux";
/* import Home from "./home";
import AdminManager from "./adminManager";
import UserBox from "./userBox"; */
import { initAuthSettings } from "../actions/initialize";
import { apiAdminRequest } from "../actions/api";

class App extends React.Component {
  static closeDrawer() {
    /* const d = document.querySelector(".mdl-layout");
    d.MaterialLayout.toggleDrawer(); */
  }

  constructor(props) {
    super(props);
    this.state = {
      needUpdate: true,
      activeTab: 0,
      drawer: "permanent",
      drawerOpen: false,
      aboveToolbar: false,
    };
  }

  componentDidMount() {
    this.props.initAuthSettings();
    this.updateAdmin();
    Rmdc.init(this, { typography: true });
  }

  componentWillUpdate() {
    /* const items = document.getElementsByClassName("mdl_closedrawer");
    for (let i = 0; i < items.length; i += 1) {
      items[i].removeEventListener("click", App.closeDrawer);
    } */
  }

  componentDidUpdate() {
    this.updateAdmin();
    /* const items = document.getElementsByClassName("mdl_closedrawer");
    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener("click", App.closeDrawer);
    } */
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

  handleDialog = () => {
    const dialog = (
      <Dialog header="Are you happy?" actions={[{ name: "Cancel" }, { name: "Continue" }]}>
        <div>Please check the left and right side of this element for fun.</div>
      </Dialog>);
    Rmdc.showDialog(dialog);
  }

  handleTimeoutError() {
    this.todo = {};
  }

  handleDrawerChange = (name, index) => {
    let drawer = name;
    let aboveToolbar = false;
    const drawerOpen = false;
    if (index < 2) {
      drawer = "permanent";
      if (index === 1) {
        aboveToolbar = true;
      }
    }
    this.setState({
      drawer, activeTab: index, aboveToolbar, drawerOpen,
    });
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
    return (
      <Content>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start" >
              {icon}
              <ToolbarTitle>Title</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <Drawer
          type={this.state.drawer}
          open={this.state.drawerOpen}
          above={this.state.aboveToolbar}
          onClose={this.toggleDrawer}
        >
          <DrawerContent list>
            <ListItem type="a" icon="inbox" activated>Inbox</ListItem>
            <ListItem type="a" icon="star">Star</ListItem>
          </DrawerContent>
        </Drawer>
        <Content>
          <div>
            <section>
              <h1>TODO</h1>
              <Tabbar onChange={this.handleDrawerChange} activeTab={this.state.activeTab} >
                <Tab text="permanent below" />
                <Tab text="permanent above" />
                <Tab text="persistent" />
                <Tab text="temporary" />
              </Tabbar>
            </section>
          </div>
        </Content>
        <Fab icon="favorite" onClick={this.handleDialog} />
        <Snackbar message="Hello from snackbar" />
      </Content>
    );
  }

  /**
   * WIP : toggleDrawer : https://codepen.io/surma/pen/EKjNON?editors=1010
   */
  /* render() {
    let { isLoading } = this.props;
    if ((!isLoading) && (!this.props.admin) && this.props.isSignedIn) {
      isLoading = true;
    }
    const appIcon = "app-icon";
    const style = {};
    const items = [];
    const routes = [];
    const toolbox = "";
    const navbox = "";
    const { screens, titleName, appName } = this.props;
    screens.forEach((screen) => {
      if (screen.access === "all" ||
      (this.props.isSignedIn && screen.access === "auth") ||
      ((!this.props.isSignedIn) && screen.access === "public")) {
        let className = "mdl_closedrawer";
        if (titleName === screen.name) {
          className += " mdl-navigation__selectedlink";
        }
        items.push({
          className, ...screen,
        });
      }
      if (screen.path) {
        routes.push({ ...screen });
      }
    });

    return (
      <div>
        <Layout fixedHeader>
          <Header
            title={
              <span>
                <span style={{ fontWeight: "900" }}>{appName}</span>
                <span style={{ color: "#ddd" }}>{titleName}</span>
              </span>}
          >
            <Navigation>
              {navbox}
              {toolbox}
              <UserBox store={this.props.store} style={style} />
            </Navigation>
          </Header>
          <Drawer
            title={
              <span>{appName}
                <IconButton
                  name=""
                  colored
                  style={{ marginLeft: "124px" }}
                  id="bot-menu"
                  className={appIcon}
                />
              </span>}
          >
            <Menu target="bot-menu" align="right">
              <MenuItem disabled>Properties</MenuItem>
              <MenuItem className="mdl_closedrawer">Change</MenuItem>
            </Menu>
            <Navigation>
              {items.map(item => (
                <Link
                  key={item.id}
                  href={`#${item.name}`}
                  to={item.to}
                  className={item.className}
                ><i className="material-icons">{item.icon}</i>{item.name}
                </Link>))}
            </Navigation>
          </Drawer>
          <Switch>
            {routes.map((screen) => {
              if (screen.name === "Home") {
                return (<Route key={screen.id} path="*" component={Home} />);
              } else if (screen.name === "Admin") {
                return (
                  <Route
                    key={screen.id}
                    path={screen.path}
                    render={props => <AdminManager {...props} activeTab={this.state.activeTab} />}
                  />);
              }
              const component = screen.render(screen.name);
              return (<Route key={screen.id} path={screen.path} component={component} />);
            })}
          </Switch>
        </Layout>
      </div>
    );
  } */
}

App.defaultProps = {
  error: null,
  admin: null,
  appName: "",
  screens: [],
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
  initAuthSettings: PropTypes.func.isRequired,
  apiAdminRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { admin, screens, name } = state.app;
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
    admin, isLoading, isSignedIn, titleName, error, screens, appName: name,
  };
};

const mapDispatchToProps = dispatch => ({
  initAuthSettings: () => {
    dispatch(initAuthSettings());
  },
  apiAdminRequest: () => {
    dispatch(apiAdminRequest());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
