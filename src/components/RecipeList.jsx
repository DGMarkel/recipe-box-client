import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import BriefRecipeCard from './BriefRecipeCard'

import './RecipeList.css'

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
        <div className="recipes-container">
          { (this.state.recipesLoaded)
            ? this.state.recipes.map( (recipe, index) =>
              <BriefRecipeCard recipe={recipe} index={index} />
            )
            : <p>Loading...</p>
          }
        </div>
    )
  }
}

export default withRouter(RecipeList)
