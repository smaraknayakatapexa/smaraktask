import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        .post("/api/user-login", loginRequest)
        .then((response) => {
          if (response.data.status == 200) {
            localStorage.setItem("token", response.data.token);

            navigate("mainDashboard");
            // window.location.reload();
          } else if (response.data.status == 400) {
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!- loginApi", error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "25%",
            border: "solid grey",
            borderWidth: "0.25px",
            padding: 10,
          }}
        >
          <p style={{ color: "black" }}>Login to continue</p>

          <input
            name="username"
            placeholder="Username"
            value={username}
            type="text"
            onChange={(e) => usernameHandler(e)}
            className="input-login"
          />
          <input
            name="password"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => passwordHandler(e)}
            className="input-login"
          />
          <button
            onClick={(e) => {
              loginApi(e);
            }}
            className="button-login"
          >
            Login
          </button>
        </div>
      </header>
    </div>
  );
}

export default Login;
