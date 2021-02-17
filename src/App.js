import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./container/Login";
import Dashboard from "./components/dashboard";
import Signup from "./container/signup";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
          <Login />
         </Route>

         <Route path="/dashbord">
           <Dashboard/>
         </Route>

         <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
    }
export default App;
