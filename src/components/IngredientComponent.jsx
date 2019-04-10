import React, { Component } from 'react'

export default class IngredientContainer extends Component {

  render() {
    console.log(this.props.recipe)
    return (
      <table border="1">
        <tr>
          <th>Ingredient</th>
          <th>Calories(kCal)</th>
          <th>Carbohydrates(g)</th>
          <th>Protein(g)</th>
          <th>Sugars(g)</th>
        </tr>
        {this.props.recipe.ingredients.map((ingredient, index) => {
          return <tr key={index}>
            <td>{ingredient.food_name}, {ingredient.serving_qty} {ingredient.serving_unit}</td>
            <td>{Math.floor(ingredient.calories)}</td>
            <td>{ingredient.total_carbohydrates}</td>
            <td>{ingredient.protein}</td>
            <td>{ingredient.sugars}</td>
          </tr>
        })}
        </table>
      )
    }
}
