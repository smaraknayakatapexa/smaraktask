import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "../pages/Login";
import MainDashboard from "../pages/MainDashboard";
import StudentDashboard from "../pages/StudentDashboard";

export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/mainDashboard">
          <MainDashboard />
        </Route>

        <Route path="/studentDashboard" component={StudentDashboard}></Route>
      </Switch>
    </Router>
  );
}
