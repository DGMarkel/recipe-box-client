import React, { Component } from 'react';

export default class RegisterForm extends Component {
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
    const name = e.target.name.value;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={ (event) => { this.props.RegisterFormSubmit(event, this.state) } }>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
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
