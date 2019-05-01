import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import BriefRecipeCard from '../components/BriefRecipeCard'
import Auth from '../modules/Auth'

class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: null,
      recipesLoaded: false,
      search_term: ''
    }
  }

  componentDidMount() {
    this.props.user ? this.loadUserRecipes() : this.loadAllRecipes()
  }

  componentDidUpdate() {
    if (this.state.search_term === '' && !this.props.user) {
      this.loadAllRecipes()
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

  loadAllRecipes = () => {
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {

        this.setState({
          recipes: resJSON,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
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
        recipes: recipes
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
          </form>
        </div>
        { (this.state.recipesLoaded)
          ?
            this.state.recipes.map( recipe =>
              <div className="recipe-card">
                <BriefRecipeCard recipe={recipe} key={recipe.food_name} user={this.props.user} />
              </div>
            )
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default withRouter(Recipes)
