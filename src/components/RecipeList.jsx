import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import BriefRecipeCard from './BriefRecipeCard'

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
              <BriefRecipeCard recipe={recipe} key={recipe.food_name} />
            )
          : <p>Loading...</p>
        }
      </>
    )
  }

}

export default withRouter(RecipeList)
