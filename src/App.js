import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./components/home";
import SignUp from "./components/sign-up";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <Container>
            <Link className="app__header-logo" to="/">
              Campsite Finder
            </Link>
          </Container>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
        </main>
      </div>
    );
  }
}

export default App;
