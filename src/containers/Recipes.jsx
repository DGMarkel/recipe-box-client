import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import BriefRecipeCard from '../components/BriefRecipeCard'
import Auth from '../modules/Auth'

class RecipeList extends Component {
  constructor() {
    super()
    this.state = {
      recipes: null,
      recipesLoaded: false
    }
  }

  componentDidMount() {
    this.props.user ? this.userRecipes() : this.allRecipes()
  }

  userRecipes = () => {
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

  allRecipes = () => {
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {

        this.setState({
          recipes: resJSON,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
  }

  searchRecipes = (e) => {
    const search_term = e.target.value
    fetch('/search-by-ingredient', {
      body: {
        ingredient: {
          search_term: search_term
        }
      }
    }).then(res=>res.json())
    .then(res=>{
      this.setState({
        ...this.state,
          recipes: res
      })
    })
    }
  }

  render() {
    return (
      <>
        { (this.state.recipesLoaded)
          ? this.state.recipes.map( recipe =>
            <div className="recipe-card">
              <BriefRecipeCard recipe={recipe} key={recipe.food_name} />
            </div>
            )
          : <p>Loading...</p>
        }
      </>
    )
  }

}

export default withRouter(RecipeList)
