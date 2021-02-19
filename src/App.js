import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./container/Login";
import Dashboard from "./components/dashboard";
import Signup from "./container/signup";
import { Component } from "react";

class App extends Component {
  constructor(){
    super();
  this.state={
    user:{}
  };
  this.handelLogin = this.handelLogin.bind(this);
  }
  handelLogin = (data)=>{
    this.setState({ 
       user: data
    })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"
            render = { props => (
              <Login {...props} handelLogin = {this.handelLogin}  />
            )}
            />
            <Route path="/dashbord"
            render = {props => (
          <Dashboard {...props} user={this.state.user} />

        )}
              />

           
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
