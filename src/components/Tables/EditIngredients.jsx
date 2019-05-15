import React, { Component } from 'react'

export default class IngredientsTable extends Component {

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Serving Unit</th>
            <th>Calories(kCal)</th>
            <th>Carbohydrates(g)</th>
            <th>Protein(g)</th>
            <th>Sugars(g)</th>
          </tr>
          {this.props.ingredients.map((ingredient, index) => {
            return <tr key={index}>
              <td>{ingredient.food_name}</td>
              <td><input type="number" value={ingredient.serving_qty} /></td>
              <td><input type="text" value={ingredient.serving_unit} /></td>
              <td>{Math.floor(ingredient.calories)}</td>
              <td>{ingredient.total_carbohydrate}</td>
              <td>{ingredient.protein}</td>
              <td>{ingredient.sugars}</td>
              <td><button>Update</button></td>
              <td><button>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
