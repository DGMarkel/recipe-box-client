import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/UserActions'
import Auth from '../modules/Auth'

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSignUpSubmit = (e) => {
    console.log(JSON.stringify(this.state))
    e.preventDefault();
    return fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: this.state
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
      }).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={ (e) => { this.handleSignUpSubmit(e) } }>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Register!"/>
        </form>
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
