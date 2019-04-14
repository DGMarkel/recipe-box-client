import React, { Component } from 'react';
import './App.css'
import routes from './routes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom'
import * as actions from './actions/UserActions'


class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
        </div>
        <div className="nav">
          <Link to="/dash">Home</Link>
          <Link to="/recipes/new">Add a Recipe</Link>
          <Link to="/logout" onClick={this.props.handleLogout}>Logout</Link>
        </div>
        <>{ routes }</>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRegisterSubmit: bindActionCreators(actions.registerUser, dispatch),
    handleLogout: bindActionCreators(actions.logoutUser, dispatch)

  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
