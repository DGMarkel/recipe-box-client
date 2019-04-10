import React, { Component } from 'react'

export default class IngredientContainer extends Component {

  render() {
    console.log(this.props.ingredient)
    const ingredient = this.props.ingredient
    return (
      <div>
        <tr>
          <td>{ingredient.food_name}, {ingredient.serving_qty} {ingredient.serving_unit}</td>
          <td>{Math.floor(ingredient.calories)}</td>
          <td>{ingredient.total_carbohydrates}</td>
          <td>{ingredient.protein}</td>
          <td>{ingredient.sugars}</td>
        </tr>
      </div>
    )
  }
}
