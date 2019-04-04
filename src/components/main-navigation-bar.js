import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { isUserLoggedIn, logOutUser } from "../modules/users";

const MainNavigationBar = ({ currentUser, history, handleLogOut }) => {
  return (
    <Menu secondary>
      <Menu.Item>
        <Link className="app__header-logo" to="/">
          CampQuest
        </Link>
      </Menu.Item>
      {isUserLoggedIn(currentUser) ? (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => handleLogOut(history)}>Sign Out</Button>
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Log In</Link>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default connect(
  null,
  { handleLogOut: logOutUser }
)(MainNavigationBar);
