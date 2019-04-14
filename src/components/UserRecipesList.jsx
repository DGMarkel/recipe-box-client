import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/RecipeActions'

class UserRecipesList extends Component {

  renderRecipeIngredients = (recipe, index) => {
    return (
      <div className="ingredientsList" key={index}>
        <p>{recipe.title}</p><br />
        <em>{recipe.description}</em>
      </div>
    )
  }

  render() {
    return (
      <div>
        { (this.props.recipes)
            ? this.props.recipes.map((recipe, index) => this.renderRecipeIngredients(recipe, index))
            : <h2>You haven't added any recipes yet</h2>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes
  }
}

export default connect(mapStateToProps)(UserRecipesList)
