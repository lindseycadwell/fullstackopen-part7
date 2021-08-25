import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated === true ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
