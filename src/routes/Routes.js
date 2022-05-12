import React from "react";
import {
  BrowserRouter as Router,
  Routes,
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
      <Routes>
        <Route exact path="/" element={<Login />}></Route>

        <Route path="/mainDashboard" element={<MainDashboard />}></Route>

        <Route path="/studentDashboard" element={<StudentDashboard />}></Route>
      </Routes>
    </Router>
  );
}
