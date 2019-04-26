import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'

import Auth from '../modules/Auth'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: '',
        title: '',
        image_url: '',
        description: '',
        ingredients: []
      },
      toggleAddIngredients: false,
      rawIngredients: ''
    }
  }

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleOnChangeForRecipeDetails = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      recipe: {
      ...this.state.recipe,
        [name]: value
      }
    });
  }

  handleOnChangeForIngredients = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedIngredients = this.state.recipe.ingredients
    updatedIngredients[index][name] = value
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: updatedIngredients
      }
    })
  }

  renderIngredientsInForm = () => {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <div className="ingredient" key={index}>
          <h3>{ingredient.food_name}</h3>
          <p>Calories: {ingredient.calories} Total Fat: {ingredient.total_fat} Protein: {ingredient.protein} Carbs: {ingredient.total_carbohydrate}</p>
          Quantity:
            <input
              type="text"
              name="serving_qty"
              value={ingredient.serving_qty}
              onChange={e=>this.handleOnChangeForIngredients(e, index)}
            />
          Serving Unit:
            <input
              type="text"
              name="serving_unit"
              value={ingredient.serving_unit}
              onChange={e=>this.handleOnChangeForIngredients(e, index)}
            /><br />
          <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => this.props.updateIngredient(e, this.state.recipe.id, ingredient) }/>
          <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => this.props.deleteIngredient(e, this.state.recipe.id, ingredient) }/>
          <hr />
        </div>
      )
    })
  }

  renderAddIngredientsForm = () => {
    return (
      <form onSubmit={e => {this.fetchIngredients(e); this.setState({toggleAddIngredients: false})} }>
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
        this.postIngredients(ingredientList)
      }).catch(err => console.log(err));
  }

  postIngredients = ingredients => {
    fetch('/edit-recipe', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          id: this.state.recipe.id,
          title: this.state.recipe.title,
          description: this.state.recipe.description,
          image_url: this.state.recipe.image_url,
          ingredients: ingredients
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    })
  }

  render() {
    return (
      <>
        <form onSubmit={e => this.props.updateRecipeDetails(e, this.state.recipe)}>
          <textarea
            cols="60"
            name="title"
            value={this.state.recipe.title}
            placeholder="Title"
            onChange={event => this.handleOnChangeForRecipeDetails(event)}
            /><br />
            <textarea
              cols="60"
              name="image_url"
              value={this.state.recipe.image_url}
              placeholder="Image"
              onChange={event => this.handleOnChangeForRecipeDetails(event)}
              /><br />
          <textarea
            cols="60"
            name="description"
            value={this.state.recipe.description}
            placeholder="Brief Description"
            onChange={event => this.handleOnChangeForRecipeDetails(event)}
          /><br />
          { this.renderIngredientsInForm() }
          { this.state.toggleAddIngredients ?
              this.renderAddIngredientsForm()
              : <input type="button" value="Add Ingredients" onClick={this.setState({toggleAddIngredients:true})}/>
          }
          <input type="submit" value="Update Recipe"/>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.user.recipes.find( recipe => recipe.id === ownProps.location.state.recipe.id )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
