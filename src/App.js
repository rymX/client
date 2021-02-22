import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./container/Login";
import Dashboard from "./components/dashboard";
import Signup from "./container/signup";
import { Component } from "react";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div>


        <BrowserRouter>
          <Switch>
            <Route exact path="/"
              render={props => (
                <Login {...props} />
              )}
            />
            <Route path="/dashbord"
              render={props => (
                <Dashboard {...props} />

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
