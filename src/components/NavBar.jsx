import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auth from './modules/Auth'
import './App.css'
import routes from './routes'

class App extends Component {

  render() {
    return (
      <div className="navigation"
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        <div>
           <a href="/dash">Dashboard</a>
           <a href="/my-recipes">My Recipes</a>
           <a href="recipes/new">Add a Recipe</a>
           <a href="/logout" onClick={this.props.handleLogout}>Logout</a>
         </div>
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
