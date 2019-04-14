import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auth from './modules/Auth'
import './App.css'
import routes from './routes'
import NavBar from './components/NavBar'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="mainLogo">
          <h1>Recipe Box</h1>
          { Auth.isUserAuthenticated() ? <NavBar /> : <></>}
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
