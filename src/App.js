import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./container/Login";
import Dashboard from "./components/dashboard";
import Signup from "./container/signup";
import { Component } from "react";
import Productcontent from "./components/productcontent";
import Wishlistcontent from "./components/wishlistContent"
import productcontent from "./components/productcontent";

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
            <Route path="/Wishlistcontent">
              <Wishlistcontent />
            </Route>
            <Route path="/productcontent">
              <Productcontent />
            </Route>
            

           
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
