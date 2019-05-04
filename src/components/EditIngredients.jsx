import React, { Component } from 'react'

export default class EditIngredients extends Component {

  render() {
    return (
      <div className="edit-recipe-form">
        <table>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Serving Unit</th>
            <th>Calories(kCal)</th>
            <th>Carbohydrates(g)</th>
            <th>Protein(g)</th>
            <th>Sugars(g)</th>
          </tr>
        {
          this.props.ingredients.map((ingredient, index) => {
            return (
              <tr>
                <td>{ingredient.food_name}</td>
                <td>
                  <input
                    type="text"
                    name="serving_qty"
                    value={ingredient.serving_qty}
                    onChange={e=>this.props.handleOnChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="serving_unit"
                    value={ingredient.serving_unit}
                    onChange={e=>this.props.handleOnChange(e, index)}
                  />
                </td>
                <td>{ingredient.calories}</td>
                <td>{ingredient.total_carbohydrate}</td>
                <td>{ingredient.protein}}</td>
                <td>{ingredient.protein}</td>
                <td>{ingredient.sugars}</td>
              </tr>
            )
          })
        }
        </table>
      </div>
    )
  }
}
