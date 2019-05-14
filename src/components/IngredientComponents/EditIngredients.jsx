import React, { Component } from 'react'

export default class EditIngredients extends Component {

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
                  value={this.props.ingredients[index].serving_qty}
                  onChange={e=>this.props.handleOnChangeForIngredients(e, index, this.props.recipeID)}
                />
              Serving Unit:
                <input
                  type="text"
                  name="serving_unit"
                  value={this.props.ingredients[index].serving_unit}
                  onChange={e=>this.props.handleOnChangeForIngredients(e, index, this.props.recipeID)}
                /><br />
                <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => this.props.updateIngredient(e, this.props.recipeID, ingredient.food_name, this.props.ingredients[index], index) }/>
                <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => this.props.deleteIngredient(e, this.props.recipeID, ingredient) }/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
