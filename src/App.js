import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import MainNavigationBar from "./components/main-navigation-bar";
import Home from "./components/home";
import SignUp from "./components/sign-up";
import Login from "./components/login";
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
            <Route exact path="/" component={Home} />
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
