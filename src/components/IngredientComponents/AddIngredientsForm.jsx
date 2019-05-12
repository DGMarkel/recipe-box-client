import React, { Component } from 'react'

export default class AddIngredientsForm extends Component {
  render() {
    return (
       <form onSubmit={e => this.props.fetchAndPostIngredients(e, this.props.rawIngredients, this.props.recipeID) }>
        <textarea
          rows="10"
          cols="60"
          name="rawIngredients"
          value={this.props.state.rawIngredients}
          placeholder="Ingredient"
          onChange={e => this.props.handleOnChange(e)}
          /><br />
        <input type="submit" value="Save Ingredients" />
      </form>
    )
  }
}
