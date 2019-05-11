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
      rawIngredients: ''
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
            handleOnChange={this.handleOnChangeForIngredients}
            updateIngredient={this.props.updateIngredient}
            deleteIngredientLocally={this.deleteIngredientLocally}
            deleteIngredient={this.props.deleteIngredient}
            fetchRecipe={this.fetchRecipe}
            ingredients={this.props.recipe.ingredients}
            recipeID={this.props.recipe.id}
          />
          {
            (this.state.toggleAddIngredients)
              ? <div className="add-ingredients-form">
                  <AddIngredientsForm
                    fetchAndPostIngredients={this.props.fetchAndPostIngredients}
                    handleOnChange={this.handleOnChange}
                    state={this.state}
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

  componentDidUpdate() {
    // when new ingredients have been saved to backend and added to global state property newIngredients,
    // they're then added to local state.recipe.ingredients
    if (this.props.newIngredients.length > 0) {
      this.setState({
        ...this.state,
        recipe: {
          ...this.state.recipe,
          ingredients: this.state.recipe.ingredients.concat(this.props.newIngredients)
        }
      })
      this.props.clearNewIngredient()
    }
  }

  // removes deleted ingredients from state
  deleteIngredientLocally = ingredientIndex => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: this.state.recipe.ingredients.filter((ingredient) => ingredient !== this.state.recipe.ingredients[ingredientIndex] )
      }
    })
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

  //displays changes to ingredients in ingredients table
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

}

const mapStateToProps = (state, ownProps) => {
  return {
    newIngredients: state.newIngredients,
    sumNutritionalDataFor: state.sumNutritionalDataFor,
    recipe: state.recipes.find(recipe => recipe.id === ownProps.location.state.recipe.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    clearNewIngredient: bindActionCreators(actions.clearNewIngredient, dispatch),
    fetchAndPostIngredients: bindActionCreators(actions.fetchAndPostIngredients, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
