import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SignupForm extends Component {

  render() {
    return (
      <div className="form">
        <form onSubmit={ (e) => { this.handleSignUpSubmit(e) } }>
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

export default withRouter((SignupForm))
