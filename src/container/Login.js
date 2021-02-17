import React, { Component } from 'react';
import { Link  , withRouter} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login()  {  
  const history = useHistory();
 function  handlesubmit (e){
    
    e.preventDefault();
    const username= e.target.elements.username.value;
    const password= e.target.elements.password.value;
    console.log(username , password );

   axios.get(`http://localhost:4000/user/login/username/${username}/password/${password}`)
    .then (response =>{
      console.log(response.cookies);
      console.log(response);
      if (response.data)
       history.push('/dashbordtunisieimmonilier');
    })
    .catch(error =>{
      console.log({" error":error})
    })
  }
    return (
      <div className="login-wrapper">
        <div className="auth-content">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <img className="brand" src="assets/img/bootstraper-logo.png" alt="bootstraper logo" />
              </div>
              <form onSubmit={handlesubmit}>
                <div className="form-group text-left">
                  <label htmlFor="username">User Name</label>
                  <input type="text" name="username" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input type="password" name="password" className="form-control" required />
                    <div className="input-group-addon">

                      <span className="glyphicon glyphicon-eye-open" />

                    </div>
                  </div>
                </div>
                <div className="form-group text-left">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" name="remember" className="custom-control-input" id="remember-me" />
                    <label className="custom-control-label" htmlFor="remember-me"> Remember me</label>
                  </div>
                </div>
                <button type="submit" className="btn  mb-4 se-connecter"> Sign IN  </button>
              </form>
              <p className="mb-2 text-muted">Don't have account <Link to='/signup'> <a href="forgot-password.html">Sign up</a> </Link></p>
            </div>
          </div>
        </div>
      </div>

    )
  }

export default Login; 