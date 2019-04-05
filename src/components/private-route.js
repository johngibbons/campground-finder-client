import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CURRENT_USER_KEY } from "../modules/users";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(CURRENT_USER_KEY) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
