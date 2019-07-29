import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import * as actions from '../actions/RecipeActions'

import BriefRecipeCard from '../components/RecipeComponents/BriefRecipeCard'


class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      search_term: '',
      // alphabetize: false
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
        return recipes.map(recipe=><BriefRecipeCard recipe={recipe} key={recipe.id} />)
      }
      // if (this.props.recipes && this.state.alphabetize) {
      //   const alphabetizedRecipes = [...this.props.recipes].sort(this.compare);
      //   return alphabetizedRecipes.map(recipe=><BriefRecipeCard recipe={recipe} key={recipe.id} />)
      // }
      return this.props.recipes.map(recipe=><BriefRecipeCard recipe={recipe} key={recipe.id} />)
  }

  // compare = (a, b) => {
  //   // Use toUpperCase() to ignore character casing
  //   const recipeA = a.title.toUpperCase();
  //   const recipeB = b.title.toUpperCase();
  //
  //   let comparison = 0;
  //   if (recipeA > recipeB) {
  //     comparison = 1;
  //   } else if (recipeA < recipeB) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }

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
