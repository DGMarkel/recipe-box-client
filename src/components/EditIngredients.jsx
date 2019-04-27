import React, { Component } from 'react'

export default class EditIngredients extends Component {

  toggler = () => {
        console.log(this.props.ingredientUpdated)
    this.props.toggleIngredientUpdated()
    console.log(this.props.ingredientUpdated)
    if (this.props.ingredientUpdated) {
      console.log("hiya")
      this.props.fetchRecipe();
    }
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
                  value={ingredient.serving_qty}
                  onChange={e=>this.props.handleOnChange(e, index)}
                />
              Serving Unit:
                <input
                  type="text"
                  name="serving_unit"
                  value={ingredient.serving_unit}
                  onChange={e=>this.props.handleOnChange(e, index)}
                /><br />
                <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => { this.props.updateIngredient(e, this.props.recipeID, ingredient); this.toggler() } }/>
                <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => {this.props.deleteIngredient(e, this.props.recipeID, ingredient); this.props.updateLocalIngredients(index)} }/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
