import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/UserActions'
import Auth from '../../modules/Auth'

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        password: '',
        email: ''
      },
      errors: false
    }
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
        user: {
          ...this.state.user,
          [name]: value,
        }
    });
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault();
    return fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: this.state.user
      }),
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token)
        if (Auth.isUserAuthenticated()) {
          this.props.fetchUserData();
          this.props.history.push('/')
        }
        else {
          this.setState({
            ...this.state,
              errors: true
          })
        }
      }).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={ (e) => { this.handleSignUpSubmit(e) } }>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.user.username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.user.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.user.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Register!"/>
        </form>
        { this.state.errors
          ? <div className="errors">
              There was a problem creating your account.  Please ensure that all forms are filled.
            </div>
          : <></>
        }
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: bindActionCreators(actions.fetchUserData, dispatch)
  }
}



export default withRouter(connect(null, mapDispatchToProps)(SignupForm))
