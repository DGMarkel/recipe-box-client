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
        id: props.recipe.id,
        title: props.recipe.title,
        image_url: props.recipe.image_url,
        description: props.recipe.description,
        ingredients: props.recipe.ingredients
      },
      toggleAddIngredients: false,
      rawIngredients: ''
    }
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

  toggleAddIngredients = e => {
    e.preventDefault();
    this.setState({
      toggleAddIngredients: true
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
              : <input type="button" value="Add Ingredients" onClick={e=>this.toggleAddIngredients(e)}/>
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
