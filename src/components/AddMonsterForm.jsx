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
      <div className="form">
        <form onSubmit={(e) => this.props.addMonster(e, data)}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add a Monster!" />
        </form>
      </div>
    )
  }
}
