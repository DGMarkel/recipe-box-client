import React, { Component } from 'react'
import IngredientContainer from './IngredientContainer'

export default class RecipeContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        { this.props.recipe.map(ingredient => {
          return <IngredientContainer ingredient={ingredient} />
        })}
      </div>
    )
  }
}
