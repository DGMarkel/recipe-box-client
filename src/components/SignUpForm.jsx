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
            onChange={e=>this.props.handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.props.user.email}
            onChange={e=>this.props.handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.props.user.password}
            onChange={e=>this.props.handleChange(e)}
          />
          <input type="submit" value="Register!"/>
        </form>
      </div>

    )
  }
}

export default withRouter((SignupForm))
