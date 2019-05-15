import React, { Component } from 'react'

export default class IngredientsTable extends Component {

  render() {
    return (
      <table>
        <tbody>
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
              <td>{ingredient.total_carbohydrate}</td>
              <td>{ingredient.protein}</td>
              <td>{ingredient.sugars}</td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
