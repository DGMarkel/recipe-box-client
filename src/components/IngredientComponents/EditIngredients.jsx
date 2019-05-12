import React, { Component } from 'react'

export default class EditIngredients extends Component {
  constructor() {
    super()
    this.state={
      serving_data: {
        serving_unit: '',
        serving_qty: ''
      }
    }
  }

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      ...this.state,
        serving_data: {
          ...this.state.serving_data,
          [name]: value
        }
    })
  }

  render() {
    return (
      <div className="ingredients-list">
        {
          this.props.ingredients.map((ingredient, index) => {
            return (
              <div className="ingredient" key={ingredient.food_name}>
              <h3>{ingredient.food_name}</h3>
              <p>Calories: {ingredient.calories} Total Fat: {ingredient.total_fat} Protein: {ingredient.protein} Carbs: {ingredient.total_carbohydrate}</p>
              Quantity:
                <input
                  type="text"
                  name="serving_qty"
                  value={this.state.serving_data.serving_qty}
                  placeholder={ingredient.serving_qty}
                  onChange={e=>this.handleOnChange(e, index)}
                />
              Serving Unit:
                <input
                  type="text"
                  name="serving_unit"
                  value={this.state.serving_data.serving_unit}
                  placeholder={ingredient.serving_unit}
                  onChange={e=>this.handleOnChange(e, index)}
                /><br />
                <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => this.props.updateIngredient(e, this.props.recipeID, ingredient.food_name, this.state.serving_data, index) }/>
                <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => this.props.deleteIngredient(e, this.props.recipeID, ingredient) }/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
