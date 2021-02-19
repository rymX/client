import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./container/Login";
import Dashboard from "./components/dashboard";
import Signup from "./container/signup";
import { Component } from "react";
import Test from "./components/Test"

class App extends Component {
  constructor(){
    super();
  this.state={
    user:{}
  };
 // this.handelLogin = this.handelLogin.bind(this);
  }
  // handelLogin = (data)=>{
  //   this.setState({ 
  //      user: data
  //   })
  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"
            render = { props => (
              <Login {...props}   />
            )}
            />
            <Route path="/dashbord"
            render = {props => (
          <Dashboard {...props}  />

        )}
              />

           
            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/test">
              <Test />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
