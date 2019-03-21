import React, { Component } from 'react'
import IngredientContainer from './IngredientContainer'

export default class RecipeContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        <h3>{this.props.recipe.title}</h3>
        { this.props.recipe.ingredients.map((ingredient, index) => {
          return (
            <div>
              <IngredientContainer key={ingredient.food_name} ingredient={ingredient} />
              <form onSubmit={e => this.props.deleteIngredient(e, this.props.recipe.id, index)}>
                <input type="submit" value="Delete Ingredient" />
              </form>
            </div>
          )
        })}
        <form onSubmit={event => {this.props.saveRecipe(event, this.props.recipe.ingredients)}}>
          <input type="submit" value="Save Recipe" />
        </form>
      </div>
    )
  }
}
