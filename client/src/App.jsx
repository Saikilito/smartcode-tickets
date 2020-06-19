import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import { PrivateRoute } from "./components";
import Signin from "./views/signin";
import Signup from "./views/signup";
import Home from "./views/home";
import Tickets from "./views/tickets";
import Users from "./views/users";
import Page404 from "./views/Page404";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route path="/" exact>
              <Root />
            </Route>

            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>

            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>

            <PrivateRoute path="/tickets">
              <Tickets />
            </PrivateRoute>

            <PrivateRoute path="/users">
              <Users />
            </PrivateRoute>

            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

function Root() {
  const [isLoggin] = useState(false);
  useEffect(() => {
    //Verify JWT Auth
    //Load DB User info
  });
  return isLoggin ? (
    <>
      <Redirect
        to={{
          pathname: "/home",
        }}
      />
    </>
  ) : (
    <>
      <Redirect
        to={{
          pathname: "/signin",
        }}
      />
    </>
  );
}

export default App;
