import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../actions/RecipeActions'

import './NewRecipeForm.css'

import RecipePreview from '../components/RecipeComponents/RecipePreview'
import NewRecipeForm from '../components/RecipeComponents/NewRecipeForm'

class NewRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        title: '',
        image_url: '',
        description: '',
        ingredients: '',
        servings: ''
      },
      ingredients_to_fetch: '',
      errors: ''
    }
  }

  handleOnChange = event => {
    event.preventDefault();
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
    event.preventDefault();
    const value = event.target.value
    this.setState({
      ingredients_to_fetch: value
    })
  }

  fetchIngredients = event => {
    event.preventDefault()
      this.setState({
        ...this.state,
          errors: ''
      })
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
        if (res.message) {
          this.setState({
            ...this.state,
            errors: res.message
          })
        }
        else {
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
      }
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <div className="recipe-form">
          <NewRecipeForm
            recipe={this.state.recipe}
            ingredients_to_fetch={this.state.ingredients_to_fetch}
            fetchIngredients={this.fetchIngredients}
            handleOnChange={this.handleOnChange}
            handleOnChangeForIngredients={this.handleOnChangeForIngredients}
          />
        </div>
        { this.state.errors
          ? <div className="errors">
              <h1>{this.state.errors}</h1>
            </div>
          : <div className="recipe-container">
            <RecipePreview
            recipe={this.state.recipe}
            saveRecipe={this.props.saveRecipe}
            newRecipe="true" />
          </div>
        }
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
