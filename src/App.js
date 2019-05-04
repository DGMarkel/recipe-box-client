import React, { Component } from 'react';
import './App.css'
import Auth from './modules/Auth'
import routes from './routes'
import { withRouter, Link } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Welcome from './components/Welcome'

class App extends Component {
  constructor() {
    super();
    this.state={
      loginToggled: false,
      signupToggled: false
    }
  }

  handleLogout = e => {
    e.preventDefault();
    Auth.deauthenticateToken();
    this.props.history.push('/');
  }

  toggleSignup = () => {
    this.setState({
      loginToggled: false,
      signupToggled: this.state.signupToggled ? false : true
    })
  }

  toggleLogin = () => {
    this.setState({
      loginToggled: this.state.loginToggled ? false : true,
      signupToggled: false
    })
  }

  renderForms = () => {
    if (this.state.loginToggled) {
      return <LoginForm />
    }
    if (this.state.signupToggled) {
      return <SignUpForm />
    }
  }

  renderPrivateNavBar = () => {
    return (
        <div className="nav-bar">
          <Link to="/dash">Home</Link>
          <Link to="/my-recipes">My Recipes</Link>
          <Link to="/recipes/new">Add a Recipe</Link>
          <a href="/logout" onClick={e => this.handleLogout(e)}>Logout</a>
        </div>
    )
  }

  renderPublicNavBar = () => {
    return (
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to={this.props.history} onClick={()=>this.toggleSignup()}>Sign Up</Link>
        <Link to={this.props.history} onClick={()=>this.toggleLogin()}>Log In</Link>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="navigation">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        { (Auth.isUserAuthenticated())
          ? this.renderPrivateNavBar()
          : this.renderPublicNavBar()
        }
        { (!Auth.isUserAuthenticated())
           ? this.renderForms()
           : <></>
        }
        </div>
        { (!Auth.isUserAuthenticated())
          ? <Welcome />
          : <></>
        }

        <>{ routes }</>
      </div>
    );
  }
}

export default withRouter(App)
