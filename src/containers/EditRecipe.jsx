import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'

import './EditRecipe.css'

import EditIngredients from '../components/IngredientComponents/EditIngredients'
import RecipeDetails from '../components/RecipeComponents/RecipeDetails'
import AddIngredientsForm from '../components/IngredientComponents/AddIngredientsForm'
import RecipePreview from '../components/RecipeComponents/RecipePreview'

import Auth from '../modules/Auth'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: this.props.recipe.id,
        title: this.props.recipe.title,
        image_url: this.props.recipe.image_url,
        description: this.props.recipe.description,
        ingredients: this.props.recipe.ingredients,
        servings: this.props.recipe.servings
      },
      toggleAddIngredients: false, // opens/closes new ingredients form
      rawIngredients: '',
    }
  }

  render() {
    return (
      <>
        <div className="edit-recipe-form">
          <form onSubmit={e=>this.props.updateRecipeDetails(e, this.state.recipe)}>
            <RecipeDetails recipe={this.state.recipe} handleOnChange={this.handleOnChangeForRecipeDetails} />
              <input type="submit" value="Update Recipe Details" />
          </form>
          <EditIngredients
            handleOnChangeForIngredients={this.props.handleOnChangeForIngredients}
            updateIngredient={this.props.updateIngredient}
            deleteIngredient={this.props.deleteIngredient}
            ingredients={this.props.recipe.ingredients}
            recipeID={this.props.recipe.id}
          />
          {
            (this.state.toggleAddIngredients)
              ? <div className="add-ingredients-form">
                  <AddIngredientsForm
                    fetchAndPostIngredients={this.props.fetchAndPostIngredients}
                    handleOnChange={this.handleOnChange}
                    rawIngredients={this.state.rawIngredients}
                    recipe={this.props.recipe}
                  />
                  <input type="button" value="Close" onClick={this.toggleAddIngredientsForm} />
                </div>
              : <input type="button" value="Add Ingredients" onClick={this.toggleAddIngredientsForm} />
          }
        </div>
        <div className="recipe-preview">
          <RecipePreview recipe={this.props.recipe} sumNutritionalDataFor={this.props.sumNutritionalDataFor} />
        </div>
      </>
    )
  }

  // opens and closes form field for new ingredients
  toggleAddIngredientsForm = () => {
    this.setState({
      toggleAddIngredients: (this.state.toggleAddIngredients) ? false : true
    })
  }

  // updates state property rawIngredients
  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  // updates state properties for title, description, and image_url
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

}

const mapStateToProps = (state, ownProps) => {
  return {
    sumNutritionalDataFor: state.sumNutritionalDataFor,
    recipe: state.recipes.find(recipe => recipe.id === ownProps.location.state.recipe.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnChangeForIngredients: bindActionCreators(actions.handleOnChangeForIngredients, dispatch),
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    fetchAndPostIngredients: bindActionCreators(actions.fetchAndPostIngredients, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
