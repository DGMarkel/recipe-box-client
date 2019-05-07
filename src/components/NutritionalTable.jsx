import React, { Component } from 'react'

export default class IngredientsTable extends Component {

  render() {
    return (
      <table>
        <tr>
          <th>
            <td>Calories<td>
            <td>Total Fat</td>
            <td>Saturated Fat</td>
            <td>Cholesterol</td>
            <td>Sodium</td>
            <td>Carbohydrates</td>
            <td>Fiber</td>
            <td>Sugars</td>
            <td>Protein</td>
            <td>Potassium</td>
          </th>
        </tr>
        </table>
      )
    }
}
