import React, { Component } from 'react';
import { Link  , withRouter} from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Signup(props)  { 
  console.log(props.user) ; 
  const history = useHistory();
 function  handlesubmit (e){

    
    e.preventDefault();
    const username= e.target.elements.username.value;
    const useremail= e.target.elements.useremail.value;
    const password= e.target.elements.password.value;
    console.log(username , password );

   axios.post(`http://localhost:4000/user/signup`,{
       username : username ,
       useremail : useremail,
       password : password 
   })
    .then (response =>{
      console.log({"response":response})
      console.log(response.data);
      if (response.data){
        history.push('/');
      }
      // history.push('/dashbordtunisieimmonilier');
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
                  <label htmlFor="username">user Name</label>
                  <input type="text" name="username" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="useremail">E-mail</label>
                  <input type="text" name="useremail" className="form-control" required />
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
                <button type="submit" className="btn  mb-4 se-connecter"> Sign UP  </button>
              </form>
              <p className="mb-2 text-muted">Already have an account?<Link to="/"> <a href="forgot-password.html">Sign in</a> </Link></p>
            </div>
          </div>
        </div>
      </div>

    )
  }

export default Signup; 