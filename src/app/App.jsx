import React from 'react';
import dbi from '../dbi';
import { Router, Route } from 'react-router';
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

export class App extends React.Component {
  componentWillMount() {
    dbi.init();
  }
  componentWillUnmount() {
    dbi.getDb().close();
  }
  //TODO: Here we should render the login component
  render() {
    return <Router history={this.props.history}>
      <Route path="/" component={Dashboard}>
        <Route path="login" component={Login}/>
      </Route>
    </Router>;
  }
}