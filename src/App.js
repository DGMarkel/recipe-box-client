import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import Auth from './modules/Auth'
import RecipeList from './components/RecipeList'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import DashBoard from './containers/Dashboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './actions/UserActions'


class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        <div className="nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dash">Dashboard</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/logout" onClick={this.props.handleLogout}>Logout</Link>
        </div>
        <Route
          exact path="/recipes"
          render={()=><RecipeList />}
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
            () => <DashBoard user={this.props.user}/>
          }
        />
      </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRegisterSubmit: bindActionCreators(actions.registerUser, dispatch),
    handleLogout: bindActionCreators(actions.logoutUser, dispatch)

  }
}

export default connect(null, mapDispatchToProps)(App)
