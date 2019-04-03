import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
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
          <MainNavigationBar />
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

export default App;
