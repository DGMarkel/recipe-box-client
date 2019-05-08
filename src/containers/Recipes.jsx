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
      recipes: [],
      recipesLoaded: false,
      search_term: '',
      search: true
    }
  }

  componentDidMount() {
    this.props.user ? this.loadUserRecipes() : this.loadAllRecipes()
  }

  componentDidUpdate() {
    if (this.state.search_term === '' && this.state.search && !this.props.user) {
      this.loadAllRecipes();
      this.setState({
        ...this.state,
          search: false
      })
    }
    if (this.state.search_term === '' && this.state.search && this.props.user) {
      this.loadUserRecipes();
      this.setState({
        ...this.state,
          search: false
      })
    }
  }

  loadUserRecipes = () => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then( res => res.json())
    .then( res => {
      this.setState({
        recipes: res.recipes,
        recipesLoaded: true
      })
    })
  }

  searchAllRecipes = (e) => {
    e.preventDefault();
    const recipes = this.state.recipes.filter(
      recipe =>
        recipe.ingredients.find(ingredient =>
          ingredient["food_name"].includes(this.state.search_term)
        )
      );

    this.setState({
      ...this.state,
        recipes: recipes,
        search: true
    });
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
            { this.state.recipes.length === 0
              ? <p>No matches found.</p>
              : <></>
            }
          </form>
        </div>
        { (this.state.recipesLoaded)
          ?
            this.state.recipes.map( recipe =>
              <div className="recipe-card" >
                <BriefRecipeCard recipe={recipe} key={recipe.food_name} user={this.props.user} />
              </div>
            )
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRecipes: bindActionCreators(actions.loadRecipes, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))
