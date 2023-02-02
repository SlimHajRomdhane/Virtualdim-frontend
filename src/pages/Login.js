import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  let history = useHistory();

  const login = (e) => {
    axios
      .post("https://api.virtualdim.com/users/login", user)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        props.setUser(data.user);

        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="full-page section-image background-page">
      <div className="content">
        <div className="container">
          <div className="col-md-4 col-sm-6 ml-auto mr-auto">
            <div className="form">
              <div className="card card-login">
                <div className="card-header">
                  <h3 className="header text-center">Login</h3>
                </div>
                <div className="card-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="form-control"
                        onChange={handleChange}
                        id="email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={handleChange}
                        id="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer ml-auto mr-auto">
                  <button className="btn btn-warning btn-wd" onClick={login}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
