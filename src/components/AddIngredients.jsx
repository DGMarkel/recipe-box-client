import React, { Component } from 'react'

export default class AddIngredients extends Component {

  constructor() {
    super();
    this.state = {
      ingredients: ''
    }
  }

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      name: value
    })
  }

  render() {
    return (
      <form>
        <textarea
          rows="10"
          cols="60"
          name="ingredients"
          value={this.state.ingredients}
          placeholder="Ingredient"
          onChange={e => this.handleOnChange(e)}
          /><br />
      </form>
    )
  }
}
