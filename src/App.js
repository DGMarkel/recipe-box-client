import React, { Component } from 'react';
import './App.css'
import routes from './routes'
import { withRouter, Link } from 'react-router-dom'
class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        <div className="nav">
          <Link to="/dash">Home</Link>
          <Link to="/my-recipes">My Recipes</Link>
          <Link to="/recipes/new">Add a Recipe</Link>
          <Link to="/logout">Logout</Link>
        </div>
        <>{ routes }</>
      </div>
    );
  }
}

export default withRouter(App)
