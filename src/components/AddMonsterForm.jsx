import React, { Component } from 'react'

export default class AddMonsterForm extends Component {
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
        <form onSubmit={(e) => this.props.addMonster(e, this.state)}>
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
