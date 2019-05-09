import React, { Component } from 'react'
import { connect } from 'react-redux'

class NutritionalTable extends Component {

  ingredients = this.props.recipe.ingredients
  // collect names of all relevant nutritional datapoints from first ingredient
  dataPoints = Object.keys(this.ingredients[0]).slice(3, this.ingredients[0].length)
  // tally the values for each nutritional datapoint across the entire array of ingredients
  nutritionalTotals = this.dataPoints.map(dataPoint => this.props.sumNutritionalDataFor(this.ingredients, dataPoint))
  // if this.props.serving === true, calculate nutritional data for single serving
  servingTotals = this.nutritionalTotals.map(data => Math.round(data/this.props.recipe.servings))

  // removes symbols and capitalizes first letters of each word in datapoints
  formatDataPoint = dataPoint => {
    const removedSymbols = dataPoint.replace(/_/, " ")
    return removedSymbols.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
  }

  render() {
    return (
      <table>
        <tbody>
          { this.dataPoints.map( (dataPoint, index) => {
            return (
              <tr>
                <th style={{textAlign: 'left'}}>{this.formatDataPoint(dataPoint)}</th>
                <td style={{width: '150%', textAlign: 'right'}}>
                  { this.props.serving ? this.servingTotals[index] : this.nutritionalTotals[index] }
                </td>
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
