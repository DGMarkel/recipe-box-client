import React, { Component } from 'react'
import { connect } from 'react-redux'

class NutritionalTable extends Component {

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Calories</th>
          </tr>
          <tr>
            <th>Total Fat</th>
          </tr>
          <tr>
            <th>Saturated Fat</th>
          </tr>
          <tr>
            <th>Cholesterol</th>
          </tr>
          <tr>
            <th>Sodium</th>
          </tr>
          <tr>
            <th>Carbohydrates</th>
          </tr>
          <tr>
            <th>Fiber</th>
          </tr>
          <tr>
            <th>Sugars</th>
          </tr>
          <tr>
            <th>Protein</th>
          </tr>
          <tr>
            <th>Potassium</th>
          </tr>
        </tbody>
      </table>
      )
    }
}

const mapStateToProps = state => {
  return {
    sumNutritionalDataFor: state.sumNutritionalDataFor
  }
}

export default connect(mapStateToProps)(NutritionalTable)
