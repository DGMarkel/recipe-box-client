import React, { Component } from 'react';
import './App.css'
import routes from './routes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from './actions/UserActions'


class App extends Component {

  render() {
    return (
      <>{ routes }</>
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
