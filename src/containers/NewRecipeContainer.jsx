import React, { Component } from 'react'
import Ingredient from '../components/IngredientComponent'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class RecipeContainer extends Component {

  renderIngredients = () => {
    return this.props.recipe.ingredients.map((ingredient, index) => {
      return (
        <div>
          <Ingredient key={index} ingredient={ingredient} />
          <form onSubmit={e => this.props.deleteIngredient(e, this.props.recipe.id, index)}>
            <input type="submit" value="Delete Ingredient" />
          </form>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="recipe-card">
        <h1>{this.props.recipe.title}</h1>
        <p>{this.props.recipe.description}</p>
        {this.renderIngredients()}
        <form onSubmit={event => {this.props.saveRecipe(event, this.props.recipe)}}>
          <input type="submit" value="Save Recipe" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch),
    saveRecipe: bindActionCreators(actions.saveRecipe, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.user.recipes[state.user.recipes.length - 1]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer)
