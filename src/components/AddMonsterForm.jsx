import React, { Component } from 'react'
import Auth from '../Auth.js'

export default class addMonsterForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}
