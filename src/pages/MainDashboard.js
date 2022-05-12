import React from "react";
import "../App.css";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo"></img>
        <button
          onClick={() => {
            navigate("/studentDashboard");
            window.location.reload();
          }}
          className="button-login"
        >
          Go to Student Dashboard
        </button>
      </header>
    </div>
  );
}

export default MainDashboard;
