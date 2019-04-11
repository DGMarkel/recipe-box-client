import React, { Component } from 'react';
import './App.css'
import routes from './routes'

export default class App extends Component {
  render() {
    return (
      <div className="App">
       <div id="mainLogo">
         <h1>Recipe Box</h1>
       </div>
       <div className="nav">
         <a href="/login">Login</a>
         <a href="/register">Register</a>
         <a href="/dash">Dashboard</a>
         <a href="/recipes">Recipes</a>
         <a href="/logout" onClick={this.props.handleLogout}>Logout</a>
       </div>
      <>{ routes }</>
      </div>
    )
  }
}
