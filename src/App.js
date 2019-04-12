import React, { Component } from 'react';

import Auth from './modules/Auth'
import './App.css'
import routes from './routes'

export default class App extends Component {

  renderNavLinks = () => {
    return (
      <div>
         <a href="/dash">Dashboard</a>
         <a href="/my-recipes/">My Recipes</a>
         <a href="recipes/new">Add a Recipe</a>
         <a href="/logout" onClick={this.props.handleLogout}>Logout</a>
       </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        <div className="nav">
          { Auth.isUserAuthenticated() ? this.renderNavLinks() : <></>}
        </div>
      <>{ routes }</>
      </div>
    )
  }
}
