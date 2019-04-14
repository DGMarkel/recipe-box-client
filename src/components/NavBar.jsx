import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css'

export default class NavBar extends Component {

  render() {
    return (
      <div className="nav">
        <div>
           <Link to="/dash">Dashboard</Link>
           <Link to="/my-recipes">My Recipes</Link>
           <Link to="recipes/new">Add a Recipe</Link>
           <Link to="/logout" onClick={this.props.handleLogout}>Logout</Link>
         </div>
      </div>
    )
  }
}
