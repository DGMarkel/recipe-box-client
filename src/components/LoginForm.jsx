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
      user: {
        username: '',
        password: ''
      },
      errors: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
      user: {
        [name]: value,
      }
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
      }).catch(err => {
        this.setState({
          errors: true
        })
      })
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
        { this.state.errors ?
        <div className="errors">
        </div>
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

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
