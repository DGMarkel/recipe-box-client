import React, { Component } from 'react'
import IngredientContainer from './IngredientContainer'

export default class RecipeContainer extends Component {

  renderIngredients = () => {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <div>
          <IngredientContainer key={ingredient.food_name} ingredient={ingredient} />
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
        <form onSubmit={event => {this.props.saveRecipe(event, this.props.recipe)}}>
          <input type="submit" value="Save Recipe" />
        </form>
      </div>
    )
  }
}
