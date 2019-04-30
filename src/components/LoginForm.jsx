import React, { Component } from 'react';
import Auth from '../modules/Auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router-dom'
import * as actions from '../actions/UserActions'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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

  handleLoginSubmit = (e, data) => {
    e.preventDefault();
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
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
        <form onSubmit={ (e) => this.handleLoginSubmit(e, this.state) }>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Login"/>
        </form>
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
