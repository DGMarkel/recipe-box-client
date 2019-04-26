import React, { Component } from 'react'

export default class AddIngredientsForm extends Component {
  render() {
    return (
      <>
        <textarea
          rows="10"
          cols="60"
          name="rawIngredients"
          value={this.props.state.rawIngredients}
          placeholder="Ingredient"
          onChange={e => this.props.handleOnChange(e)}
          /><br />
        <input type="submit" value="Save Ingredients" onSubmit={e => this.props.fetchAndPostIngredients(e, this.props.state) }/>
      </>
    )
  }
}
