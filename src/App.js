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

  render() {
    console.log(this.props.state)
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

const mapStateToProps = state => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(App)
