import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Auth from './modules/Auth'
import MonsterList from './components/MonsterList'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import DashBoard from './components/DashBoard'


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => {
      console.log(err);
    })
  }

  handleLoginSubmit(e, data) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
        shouldGoToDash: true
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dash">Dashboard</Link>
          <Link to="/monsters">Monsters</Link>
        </div>
        <Route
          exact path="/monsters"
          render={()=><MonsterList />}
        />
        <Route
          exact path="/register"
          render={()=>
            (this.state.auth) ?
              <Redirect to="/dash" /> :
              <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/>
          }
        />
        <Route
          exact path="/login"
          render = {
            () =>
              (this.state.auth) ?
                <Redirect to="/dash" /> :
                <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
          }
        />
        <Route
          exact path="/dash"
          render = {
            () => <DashBoard />
          }
        />
      </div>
      </Router>
    );
  }
}

export default App;
