import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RecipeBrief from './RecipeBrief'

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
        <div>
          { (this.state.recipesLoaded)
            ? this.state.recipes.map( (recipe, index) =>
              { return this.renderRecipeIngredients(recipe, index) }
            )
            : <p>Loading...</p>
          }
        </div>
    )
  }
}

export default withRouter(RecipeList)
