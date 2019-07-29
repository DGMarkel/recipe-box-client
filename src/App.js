import React, { Component } from 'react';
import './App.css'
import Auth from './modules/Auth'
import routes from './routes'
import { withRouter, Link } from 'react-router-dom'

import LoginForm from './components/UserForms/LoginForm'
import SignUpForm from './components/UserForms/SignUpForm'
import Welcome from './components/Misc/Welcome'

class App extends Component {
  constructor() {
    super();
    this.state={
      loginToggled: false,
      signupToggled: false,
      firstView: true
    }
  }

  handleLogout = e => {
    e.preventDefault();
    this.toggleLogin(); // toggles state.login to false; otherwise login form would be visible on redirect to home
    Auth.deauthenticateToken();
    this.props.history.push('/');
  }

  // opens/closes signup form
  toggleSignup = () => {
    this.setState({
      loginToggled: false,
      signupToggled: this.state.signupToggled ? false : true
    })
  }

  //opens/closes login form
  toggleLogin = () => {
    this.setState({
      loginToggled: this.state.loginToggled ? false : true,
      signupToggled: false
    })
  }

  // renders login or signup forms depending on whether loginToggled/signupToggled = true || false
  renderForms = () => {
    if (this.state.loginToggled) {
      return <LoginForm />
    }
    if (this.state.signupToggled) {
      return <SignUpForm />
    }
  }

  // displays links for logged in user
  renderPrivateNavBar = () => {
    return (
        <div className="nav-bar">
          <Link to="/">Home</Link>
          <Link to="/my-recipes">My Recipes</Link>
          <Link to="/recipes/new">Add a Recipe</Link>
          <a href="/logout" onClick={e => this.handleLogout(e)}>Logout</a>
        </div>
    )
  }

  //displays links to unregistered/not logged in users
  renderPublicNavBar = () => {
    return (
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to={this.props.history} onClick={()=>this.toggleSignup()}>Sign Up</Link>
        <Link to={this.props.history} onClick={()=>this.toggleLogin()}>Log In</Link>
      </div>
    )
  }

  componentDidUpdate() {
    // hides welcome component from view after first page view
    if (this.state.firstView) {
      this.setState({
        firstView: false
      })
    }
  }

  render() {
    debugger
    return (
      <div className="App">
        <div className="navigation">
          <div id="mainLogo">
            <h1>Recipe Box</h1>
          </div>
          {
            // determines which navbar to display
            (Auth.isUserAuthenticated())
            ? this.renderPrivateNavBar()
            : this.renderPublicNavBar()
          }
          {
            // displays login/signup forms if user isn't logged in
            (!Auth.isUserAuthenticated())
             ? this.renderForms()
             : <></>
          }
        </div>
        {
          // renders welcome component only on first user view
          (!Auth.isUserAuthenticated() && this.state.firstView)
          ? <Welcome />
          : <></>
        }
        <>{ routes }</>
      </div>
    );
  }
}

export default withRouter(App)
