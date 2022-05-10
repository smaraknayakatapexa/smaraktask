import React, { useState } from "react";
import "../App.css";
import { useHistory, withRouter } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ color: "black" }}>Login to continue</p>

        <input
          name="username"
          placeholder="Username"
          value={username}
          type="text"
          onChange={(e) => usernameHandler(e)}
          style={{ margin: 5 }}
        />
        <input
          name="password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => passwordHandler(e)}
          style={{ margin: 5 }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (username == "user" && password == "pass") {
              history.push("/mainDashboard");
              window.location.reload();
            } else {
              window.alert("Invalid Credentials");
            }
          }}
        >
          Login
        </button>
      </header>
    </div>
  );
}

export default Login;
