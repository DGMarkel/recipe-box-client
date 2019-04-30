import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BriefRecipeCard from './BriefRecipeCard'
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
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {

        this.setState({
          recipes: resJSON,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
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
