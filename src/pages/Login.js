import React, { useState } from "react";
import "../App.css";
import { useHistory, withRouter } from "react-router-dom";
import axios from "../axios";

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

  const loginApi = (e) => {
    e.preventDefault();

    if (username && password) {
      const loginRequest = {
        username: username,
        password: password,
      };

      axios
        .post("/api/login", loginRequest)
        .then((response) => {
          if (response.data.status == 200) {
            localStorage.setItem("token", response.data.token);

            history.push("/mainDashboard");
            window.location.reload();
          } else if (response.data.status == 400) {
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
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
            loginApi(e);
          }}
        >
          Login
        </button>
      </header>
    </div>
  );
}

export default Login;
