import React, { Component } from 'react';
import './App.css'
import Auth from './modules/Auth'
import routes from './routes'
import { withRouter, Link } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

class App extends Component {
  constructor() {
    super();
    this.state={
      signUpToggled: false,
      loginToggled: false
    }
  }

  handleLogout = e => {
    e.preventDefault();
    Auth.deauthenticateToken();
    this.props.history.push('/');
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

  formToggler = e => {
    const name = e.target.name;
    this.setState({
      [name]: this.state[name] ? false : true
    })
  }

  renderPublicNavBar = () => {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to= "#" name="toggleSignUp" onClick={e=>this.formToggler(e)}>Sign Up</Link>
        <Link to="/login">Log In</Link>
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
        <>{ routes }</>
      </div>
    );
  }
}

export default withRouter(App)
