import React, { Component } from 'react'
import IngredientComponent from '../components/IngredientComponent'

export default class RecipesContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        <h1>{this.props.recipe.title}</h1>
        <p>{this.props.recipe.description}</p>
        <IngredientComponent recipe={this.props.recipe} />
      </div>
    )
  }
}
