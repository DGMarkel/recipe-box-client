import React, { Component } from 'react'
import IngredientContainer from './IngredientContainer'

export default class RecipesContainer extends Component {

  renderIngredients = () => {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <div>
          <IngredientContainer key={index} ingredient={ingredient} />
          <form onSubmit={e => this.props.deleteIngredient(e, this.props.recipe.id, index)}>
            <input type="submit" value="Delete Ingredient" />
          </form>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="recipe-card">
        <h1>{this.props.recipe.title}</h1>
        <p>{this.props.recipe.description}</p>
        {this.renderIngredients()}
      </div>
    )
  }
}
