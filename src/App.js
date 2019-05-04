import React, { Component } from 'react';
import './App.css'
import Auth from './modules/Auth'
import routes from './routes'
import { withRouter, Link } from 'react-router-dom'

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
      signupToggled: this.state.signupToggled ? false : true
    })
    this.toggleLogin();
  }

  toggleLogin = () => {
    this.setState({
      loginToggled: this.state.loginToggled ? false : true
    })
    this.toggleSignup();
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
        <Link to="/signup">Sign Up</Link>
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
