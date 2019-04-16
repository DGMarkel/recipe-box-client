import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import RecipeBrief from '../components/RecipeBrief'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class RecipeContainer extends Component {

  render() {
    return (
      <div className="recipe-card">
        <RecipeBrief recipe={this.props.recipe} index={0} />
        <IngredientsTable recipe={this.props.recipe} />
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
