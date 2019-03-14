import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Auth from './modules/Auth'
import MonsterList from './components/MonsterList'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import DashBoard from './components/DashBoard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './actions/UserActions'


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      Auth.deauthenticateToken()
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch( err => console.log(err))
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
          <span onClick={this.handleLogout}>Logout</span>
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
                <LoginForm handleLoginSubmit={this.props.loginUser} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(actions.loginUser, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(App)
