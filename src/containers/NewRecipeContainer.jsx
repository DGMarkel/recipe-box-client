import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import IngredientsTable from '../components/IngredientsTable'
import * as actions from '../actions/RecipeActions'

class RecipeContainer extends Component {

  render() {
    return (
      <div className="new-recipe">
        <div className="recipe-header">
          <h3 className="title">{this.props.recipe.title}</h3>
        </div>
        <img src={this.props.recipe.image_url} />
        <p>{this.props.recipe.description}</p>
        { (this.props.recipe.ingredients)
          ? <IngredientsTable recipe={this.props.recipe} />
          : <></>
        }
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

export default connect(null, mapDispatchToProps)(RecipeContainer)
