import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Auth from './modules/Auth'
import routes from './routes'
import './App.css'
import * as actions from './actions/UserActions'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

class App extends Component {
  constructor() {
    super();
    this.state={
      user: {
        username: '',
        password: '',
        email: ''
      },
      signupToggled: false,
      loginToggled: false
    }
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleLogout = e => {
    e.preventDefault();
    Auth.deauthenticateToken();
    this.props.history.push('/');
  }

  formToggler = e => {
    const name = e.target.name;
    this.setState({
      [name]: this.state[name] ? false : true
    })
  }

  renderPrivateNavBar = () => {
    return (
        <div className="nav">
          <Link to="/dash">Home</Link>
          <Link to="/my-recipes">My Recipes</Link>
          <Link to="/recipes/new">Add a Recipe</Link>
          <a href="/logout" onClick={e => this.handleLogout(e)}>Logout</a>
        </div>
    )
  }

  renderPublicNavBar = () => {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to= "#" name="signupToggled" onClick={e=>this.formToggler(e)}>Sign Up</Link>
        <Link to="#" name="loginToggled" onClick={e=>this.formToggler(e)}>Log In</Link>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        { (Auth.isUserAuthenticated())
          ? this.renderPrivateNavBar()
          : this.renderPublicNavBar()
        }
        { this.state.signupToggled ? <SignUpForm /> : <></> }
        { this.state.loginToggled ? <LoginForm /> : <></> }
        <>{ routes }</>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignUpSubmit: bindActionCreators(actions.handleSignUpSubmit, dispatch),
    fetchUserData: bindActionCreators(actions.fetchUserData, dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
