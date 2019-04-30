import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SignupForm extends Component {

  render() {
    console.log(this.props.user)
    return (
      <div className="form">
        <form onSubmit={ (e) => { this.props.handleSignUpSubmit(e, this.props.user) } }>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.props.user.username}
            onChange={this.props.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.props.user.email}
            onChange={this.props.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.props.user.password}
            onChange={this.props.handleChange}
          />
          <input type="submit" value="Register!"/>
        </form>
      </div>

    )
  }
}

export default withRouter((SignupForm))
