import React, { Component } from 'react'
import './NewRecipeForm.css'
import NewRecipeContainer from './NewRecipeContainer'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class NewRecipeForm extends Component {

  constructor(props) {
    super(props);
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
      <div>
        <div className="recipe-form">
          <h1>Create a New Recipe</h1>
          <form onSubmit={e => this.fetchIngredients(e)}>
            <textarea
              cols="60"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={event => this.handleOnChange(event)}
              /><br />
              <textarea
                cols="60"
                name="image_url"
                value={this.state.image_url}
                placeholder="Image"
                onChange={event => this.handleOnChange(event)}
                /><br />
            <textarea
              cols="60"
              name="description"
              value={this.state.description}
              placeholder="Brief Description"
              onChange={event => this.handleOnChange(event)}
            /><br />
            <textarea
              rows="10"
              cols="60"
              name="ingredients"
              value={this.state.ingredients}
              placeholder="Ingredient"
              onChange={event => this.handleOnChangeForIngredients(event)}
              /><br />
            <input type="submit" value="Add Ingredients" />
          </form>
        </div>
        <div className="recipe-container">
          <NewRecipeContainer recipe={this.state.recipe} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: bindActionCreators(actions.fetchIngredients, dispatch),
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes
  }
}

export default NewRecipeForm
