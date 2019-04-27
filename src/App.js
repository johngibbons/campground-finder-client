import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import MainNavigationBar from "./components/main-navigation-bar";
import PrivateRoute from "./components/private-route";
import Home from "./components/home";
import SignUp from "./components/sign-up";
import Login from "./components/login";
import CampsiteFinderCreation from "./components/campsite-finder-creation";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <MainNavigationBar
            currentUser={this.props.currentUser}
            history={this.props.history}
          />
        </header>
        <main className="app__main">
          <Container>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute
              path="/create-alert"
              component={CampsiteFinderCreation}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.users.currentUser };
};

export default withRouter(connect(mapStateToProps)(App));
