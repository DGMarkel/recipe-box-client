import React, { Component } from 'react';

class RegisterForm extends Component {
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

    )
  }
}
