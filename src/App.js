import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Auth from './modules/Auth'
import MonsterList from './components/MonsterList'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated()
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault();
    console.log(data)
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Route
          exact path="/monsters"
          render={()=><MonsterList />}
        />
        <Route
          exact path="/register"
          render={()=><RegisterForm
              handleRegisterSubmit={this.handleRegisterSubmit}
            />}
        />
      </div>
      </Router>
    );
  }
}

export default App;
