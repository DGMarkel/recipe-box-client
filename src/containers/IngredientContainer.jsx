import React, { Component } from 'react'

export default class IngredientContainer extends Component {



  render() {
    return (
      <div>
        <p>{this.props.ingredient.food_name}</p>
      </div>
    )
  }
}
