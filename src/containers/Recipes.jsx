import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import * as actions from '../actions/RecipeActions'

import BriefRecipeCard from '../components/RecipeComponents/BriefRecipeCard'
import Auth from '../modules/Auth'

class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      search_term: '',
    }
  }

  componentDidMount() {
    if (this.props.recipes.length === 0) {
      this.props.loadRecipes()
    }
  }

  recipeDisplay = () => {
      if (this.state.search_term.length > 0) {
        const recipes = this.props.recipes.filter(recipe=>recipe.ingredients.find(ingredient =>ingredient["food_name"].includes(this.state.search_term)));
        return recipes.map(recipe=><div className="recipe-card" ><BriefRecipeCard recipe={recipe} key={recipe.food_name} user={this.props.user} /></div>)
      }
      else {
        return this.props.recipes.map(recipe=><div className="recipe-card" ><BriefRecipeCard recipe={recipe} key={recipe.food_name} user={this.props.user} /></div>)
      }
  }

  render() {
    return (
      <div className="recipes-list">
        <div className="search">
          <form onSubmit={e=>this.searchAllRecipes(e)}>
            <input
              type="text"
              placeholder="Search recipes by ingredient"
              onChange={e => {this.setState({ ...this.state, search_term: e.target.value })}}
            />
            { this.props.recipes.length === 0
              ? <p>No matches found.</p>
              : <></>
            }
          </form>
        </div>
        { this.recipeDisplay() }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    recipes: ownProps.user ? state.recipes.filter(recipe => recipe.creator_name === state.user.username): state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRecipes: bindActionCreators(actions.loadRecipes, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))
