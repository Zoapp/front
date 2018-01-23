/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { Layout, Header, Drawer, Navigation, IconButton, Menu, MenuItem } from "react-mdl";
import PropTypes from "prop-types";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./home";
import AdminManager from "./adminManager";
import UserBox from "./userBox";
import { initAuthSettings } from "../actions/initialize";
import { apiAdminRequest } from "../actions/api";

class App extends React.Component {
  static closeDrawer() {
    const d = document.querySelector(".mdl-layout");
    d.MaterialLayout.toggleDrawer();
  }

  constructor(props) {
    super(props);
    this.state = { needUpdate: true, activeTab: 0 };
  }

  componentDidMount() {
    this.props.initAuthSettings();
    this.updateAdmin();
  }

  componentWillUpdate() {
    const items = document.getElementsByClassName("mdl_closedrawer");
    for (let i = 0; i < items.length; i += 1) {
      items[i].removeEventListener("click", App.closeDrawer);
    }
  }

  componentDidUpdate() {
    this.updateAdmin();
    const items = document.getElementsByClassName("mdl_closedrawer");
    for (let i = 0; i < items.length; i += 1) {
      items[i].addEventListener("click", App.closeDrawer);
    }
  }

  handleTimeoutError() {
    this.todo = {};
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

  /**
   * WIP : toggleDrawer : https://codepen.io/surma/pen/EKjNON?editors=1010
   */
  render() {
    let { isLoading } = this.props;
    if ((!isLoading) && (!this.props.admin) && this.props.isSignedIn) {
      isLoading = true;
    }
    const appName = "Zoapp";
    let titleName = " Zoapp";
    const avatarClass = "app-icon";
    const style = {};
    const items = [];
    const toolbox = "";
    const navbox = "";
    if (this.props.isSignedIn) {
      ({ titleName } = this.props);
      let className = "mdl_closedrawer";
      className += this.props.titleName === "Dashboard" ? " mdl-navigation__selectedlink" : "";
      items.push({
        id: "1", to: "/", icon: "dashboard", name: "Dashboard", className,
      });
      className = "mdl_closedrawer";
      className += this.props.titleName === "Admin" ? " mdl-navigation__selectedlink" : "";
      items.push({
        id: "3", to: "/admin", icon: "settings", name: "Admin", className,
      });
    } else {
      items.push({
        id: "4", to: "/", name: "Home", icon: "home", className: "mdl_closedrawer",
      });
    }
    items.push({
      id: "5", to: "/", name: "Help", icon: "help", className: "mdl_closedrawer",
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
                  className={avatarClass}
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
            <Route
              path="/admin"
              render={props => <AdminManager {...props} activeTab={this.state.activeTab} />}
            />
            <Route path="*" component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

App.defaultProps = {
  error: null,
  admin: null,
};

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  titleName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  admin: PropTypes.shape({}),
  initAuthSettings: PropTypes.func.isRequired,
  apiAdminRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { admin } = state.app;
  const isSignedIn = state.user ? state.user.isSignedIn : false;
  const isLoading = (state.app && state.app.loading) ||
    (state.auth && state.auth.loading) || (state.user && state.user.loading);
  const titleName = state.app ? state.app.titleName : "";
  let error = null;
  if (state.app && state.app.error) {
    ({ error } = state.app);
  } else if (state.auth && state.auth.error) {
    ({ error } = state.auth);
  } else if ((!error) && state.user && state.user.error) {
    ({ error } = state.user);
  }
  return {
    admin, isLoading, isSignedIn, titleName, error,
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
