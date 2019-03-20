import React, { Component } from 'react'
import IngredientContainer from './IngredientContainer'

export default class RecipeContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        <h3>{this.props.recipe.title}</h3>
        { this.props.recipe.ingredients.map(ingredient => {
          return <IngredientContainer ingredient={ingredient} />
        })}
      </div>
    )
  }
}
