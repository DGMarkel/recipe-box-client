import React, { Component } from 'react'

export default class EditIngredients extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredients: props.ingredients
    }
  }

  handleOnChange = (e, ingredientIndex) => {
    console.log(this.state.ingredients[ingredientIndex])
    const name = e.target.name
    const value = e.target.value
    this.setState({
      ...this.state,
        ingredients: this.state.ingredients.map((ingredient, index) => index === ingredientIndex ? {...ingredient, [name]: value} : ingredient)
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
                  value={this.state.ingredients[index].serving_qty}
                  onChange={e=>this.handleOnChange(e, index)}
                />
              Serving Unit:
                <input
                  type="text"
                  name="serving_unit"
                  value={this.state.ingredients[index].serving_unit}
                  onChange={e=>this.handleOnChange(e, index)}
                /><br />
                <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => this.props.updateIngredient(e, this.props.recipeID, ingredient.food_name, this.state.ingredients[index], index) }/>
                <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => this.props.deleteIngredient(e, this.props.recipeID, ingredient) }/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
