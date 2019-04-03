import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class MainNavigationBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <Link className="app__header-logo" to="/">
            Campsite Finder
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Log In</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default MainNavigationBar;
