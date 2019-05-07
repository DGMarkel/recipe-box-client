import React, { Component } from 'react'
import { connect } from 'react-redux'

class NutritionalTable extends Component {

  ingredients = this.props.recipe.ingredients
  // collect names of all relevant nutritional datapoints from first ingredient
  dataPoints = Object.keys(this.ingredients[0]).slice(3, this.ingredients.length)
  // tally the values for each nutritional datapoint across the entire array of ingredients
  nutritionalTotals = this.dataPoints.map(dataPoint => this.props.sumNutritionalDataFor(this.ingredients, dataPoint))

  render() {
    return (
      <table>
        <tbody>
          { this.dataPoints.map( (dataPoint, index) => {
            return (
              <tr>
                <th style={{textAlign: 'left'}}>{dataPoint}</th>
                <td style={{width: '150%', textAlign: 'right'}}>{this.nutritionalTotals[index]}</td>
              </tr>
            )
          })}
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
