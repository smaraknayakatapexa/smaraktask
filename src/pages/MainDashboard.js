import React from "react";
import "../App.css";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";

function MainDashboard() {
  let history = useHistory();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo"></img>
        <button
          onClick={() => {
            history.push("/studentDashboard");
            window.location.reload();
          }}
        >
          Go to Student Dashboard
        </button>
      </header>
    </div>
  );
}

export default MainDashboard;
