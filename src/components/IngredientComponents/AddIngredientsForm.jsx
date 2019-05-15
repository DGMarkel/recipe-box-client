import React, { Component } from 'react'

export default class AddIngredientsForm extends Component {
  constructor() {
    super()
    this.state={
      rawIngredients: ''
    }
  }

  handleOnChange = e => {
    this.setState({
      rawIngredients: e.target.value
    })
  }

  render() {
    return (
       <form onSubmit={e => this.props.fetchAndPostIngredients(e, this.state.rawIngredients, this.props.recipe) }>
        <textarea
          rows="10"
          cols="60"
          name="rawIngredients"
          value={this.props.rawIngredients}
          placeholder="Add Ingredients"
          onChange={e => this.handleOnChange(e)}
          /><br />
        <input type="submit" value="Save Ingredients" />
      </form>
    )
  }
}
