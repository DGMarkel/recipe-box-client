import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../actions/RecipeActions'

import './NewRecipeForm.css'

import RecipePreview from '../components/RecipePreview'
import NewRecipeForm from '../components/NewRecipeForm'

class NewRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        title: '',
        image_url: '',
        description: '',
        ingredients: ''
      },
      ingredients_to_fetch: ''
    }
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      recipe: {
        ...this.state.recipe,
        [name]: value
      }
    });
  }

  handleOnChangeForIngredients = event => {
    const value = event.target.value
    this.setState({
      ingredients_to_fetch: value
    })
  }

  fetchIngredients = event => {
    event.preventDefault()
      fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      body: JSON.stringify({
        query: this.state.ingredients_to_fetch
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
          ...this.state,
          recipe: {
            ...this.state.recipe,
            ingredients: ingredientList
          }
        })
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <div className="recipe-form">
          <NewRecipeForm recipe={this.state.recipe} handleOnChange={this.handleOnChange} handleOnChangeForIngredients={this.handleOnChangeForIngredients}/>
        </div>
        <div className="recipe-container">
          <RecipePreview recipe={this.state.recipe} fetchIngredients={this.fetchIngredients} newRecipe="true" />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveRecipe: bindActionCreators(actions.saveRecipe, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(NewRecipe)