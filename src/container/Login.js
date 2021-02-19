import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
 }
  handlesubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    console.log(username, password);

    axios
      .get(
        `http://localhost:4000/user/login/username/${username}/password/${password}`
      )
      .then((response) => {
        console.log(response);
        if (response.data) {
         // this.props.handelLogin(response.data);
        this.props.history.push('/dashbord');
        }
      })
      .catch((error) => {
        console.log({ " error": error });
      });
  };
  render() {
    return (
      <div>
        <div className="login-wrapper">
          <div className="auth-content">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <img
                    className="brand"
                    src="assets/img/bootstraper-logo.png"
                    alt="bootstraper logo"
                  />
                </div>
                <form onSubmit={this.handlesubmit}>
                  <div className="form-group text-left">
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        required
                      />
                      <div className="input-group-addon">
                        <span className="glyphicon glyphicon-eye-open" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-left">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        name="remember"
                        className="custom-control-input"
                        id="remember-me"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="remember-me"
                      >
                        {" "}
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn  mb-4 se-connecter">
                    {" "}
                    Sign IN{" "}
                  </button>
                </form>
                <p className="mb-2 text-muted">
                  Don't have account{" "}
                  <Link to="/signup">
                    {" "}
                    <a href="forgot-password.html">Sign up</a>{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
