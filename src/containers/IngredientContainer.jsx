import React, { Component } from 'react'

export default class IngredientContainer extends Component {



  render() {
    const ingredient = this.props.ingredient
    return (
      <div>
        <p>{ingredient.serving_qty} {ingredient.serving_unit} {ingredient.food_name}</p>
      </div>
    )
  }
}
