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
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLoginSubmit = (e, data) => {
    e.preventDefault();
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token)
        if (Auth.isUserAuthenticated()) {
          this.props.fetchUserData();
        }
      }).catch(err => console.log(err))
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
          console.log(this.props.auth)
    return (
      <Router>
      <div className="App">
        <div className="nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dash">Dashboard</Link>
          <Link to="/monsters">Monsters</Link>
          <Link to="/logout" onClick={this.props.handleLogout}>Logout</Link>
        </div>
        <Route
          exact path="/monsters"
          render={()=><MonsterList />}
        />
        <Route
          exact path="/register"
          render={()=>
            (this.props.auth) ?
              <Redirect to="/dash" /> :
              <RegisterForm handleRegisterSubmit={this.props.handleRegisterSubmit}/>
          }
        />
        <Route
          exact path="/login"
          render = {
            () =>
              (this.props.auth) ?
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

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: bindActionCreators(actions.fetchUserData , dispatch),
    handleRegisterSubmit: bindActionCreators(actions.registerUser, dispatch),
    handleLogout: bindActionCreators(actions.logoutUser, dispatch)

  }
}

const mapStateToProps = state => {
  return {
    auth: state.user.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
