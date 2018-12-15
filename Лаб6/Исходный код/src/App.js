import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";

class App extends Component {
  getUser({ match }) {
    const { id } = match.params;
    console.log(id);
    return <User id={id} />;
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/brokers/:id" render={this.getUser} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
