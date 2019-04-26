import React, { Component } from 'react'

export default class EditIngredients extends Component {
  render() {
    return (
      <div className="ingredient" key={this.props.ingredient.food_name}>
        <h3>{this.props.ingredient.food_name}</h3>
        <p>Calories: {this.props.ingredient.calories} Total Fat: {this.props.ingredient.total_fat} Protein: {this.props.ingredient.protein} Carbs: {this.props.ingredient.total_carbohydrate}</p>
        Quantity:
          <input
            type="text"
            name="serving_qty"
            value={this.props.ingredient.serving_qty}
            onChange={e=>this.props.handleOnChange(e, this.props.index)}
          />
        Serving Unit:
          <input
            type="text"
            name="serving_unit"
            value={this.props.ingredient.serving_unit}
            onChange={e=>this.props.handleOnChange(e, this.props.index)}
          /><br />
      </div>
    )
  }
}
