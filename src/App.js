import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auth from './modules/Auth'
import './App.css'
import routes from './routes'

class App extends Component {

  renderNavLinks = () => {
    return (
      <div>
         <a href="/dash">Dashboard</a>
         <a href="/my-recipes">My Recipes</a>
         <a href="recipes/new">Add a Recipe</a>
         <a href="/logout" onClick={this.props.handleLogout}>Logout</a>
       </div>
    )
  }

  renderUserData = (user) => {
    return (
        <div>
          <a href="#">Settings</a>
          <a href="#">Help</a>
        </div>
    )
  }

  render() {
    console.log(this.props.user)
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
          { Auth.isUserAuthenticated() ? this.renderUserData(this.props.user) : <></>}
        </div>
        <div className="nav">
          { Auth.isUserAuthenticated() ? this.renderNavLinks() : <></>}
        </div>
      <>{ routes }</>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
