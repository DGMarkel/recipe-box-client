import React, { Component } from 'react'

export default class RecipeContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        { this.props.ingredients.map(ingredient => {
          return <p>{ingredient.food_name}</p>
        })}
      </div>
    )
  }
}
