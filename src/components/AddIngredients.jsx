import React, { Component } from 'react'

export default class AddIngredients extends Component {

  constructor() {
    super();
    this.state = {
      rawIngredients: '',
      fetchedIngredients: []
    }
  }

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  fetchIngredients = event => {
    event.preventDefault()
      fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      body: JSON.stringify({
        query: this.state.rawIngredients
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
      }
      }).then(res => res.json())
      .then(res => {
        const ingredientList = res.foods.map( ingredient => {
          let ingredientList = {}
          ingredientList["food_name"] = ingredient.food_name;
          ingredientList["serving_qty"] = ingredient.serving_qty;
          ingredientList["serving_unit"] = ingredient.serving_unit;
          ingredientList["calories"] = ingredient.nf_calories;
          ingredientList["total_fat"] = ingredient.nf_total_fat;
          ingredientList["saturated_fat"] = ingredient.nf_saturated_fat;
          ingredientList["cholesterol"] = ingredient.nf_cholesterol;
          ingredientList["sodium"] = ingredient.nf_sodium;
          ingredientList["total_carbohydrate"] = ingredient.nf_total_carbohydrate;
          ingredientList["dietary_fiber"] = ingredient.nf_dietary_fiber;
          ingredientList["sugars"] = ingredient.nf_sugars;
          ingredientList["protein"] = ingredient.nf_protein;
          ingredientList["potassium"] = ingredient.nf_potassium;
          return ingredientList
        })
        this.setState({
          fetchedIngredients: ingredientList
        })
      }).catch(err => console.log(err));
  }

  postIngredients = event => {
    event.preventDefault();
    fetch('/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        ingredient: {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    })
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={e => this.fetchIngredients(e) }>
        <textarea
          rows="10"
          cols="60"
          name="rawIngredients"
          value={this.state.rawIngredients}
          placeholder="Ingredient"
          onChange={e => this.handleOnChange(e)}
          /><br />
        <input type="submit" value="Save Ingredients"/>
      </form>
    )
  }
}
