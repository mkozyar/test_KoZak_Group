import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Table from "./client/components/Table/Table"
import Login from "./client/components/Login/Login"
import Registration from "./client/components/Registration/Registration"

import DelegateMarkdownLinks from "./DelegateMarkdownLinks";
import { BrowserRouter } from "react-router-dom";


const base = document.querySelector("base");
const baseHref = base ? base.getAttribute("href") : "/";

class App extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }

  componentDidMount() {
    // fetch('/api/message')
    //   .then(response => response.json())
    //   .then(json => this.setState({ message: json }));
  }

  render() {
    return (
      <BrowserRouter basename={baseHref.replace(/\/$/, "")}>
      <DelegateMarkdownLinks>
        <Switch>
          <Route path="/" exact={true} component={Table} />
          <Route path="/table" component={Table} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
        </Switch>
      </DelegateMarkdownLinks>
    </BrowserRouter>
    );
  }
}

export default App;
