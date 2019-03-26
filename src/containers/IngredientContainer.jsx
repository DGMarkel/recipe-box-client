import React, { Component } from 'react'

export default class IngredientContainer extends Component {

  render() {
    console.log(this.props.ingredient)
    const ingredient = this.props.ingredient
    return (
      <div>
        <p>{ingredient.serving_qty} {ingredient.serving_unit} {ingredient.food_name}</p>
        <p>Calories: {Math.floor(ingredient.calories)}</p>
      </div>
    )
  }
}
