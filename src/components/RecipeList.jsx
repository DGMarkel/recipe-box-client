import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import RecipesContainer from '../containers/RecipesContainer'

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

  renderRecipeIngredients = (recipe, index) => {
    return (
      <div className="ingredientsList" key={index}>
        <Link to={{
          pathname: `recipes/${recipe.title}`,
          state: {
            recipe: recipe
          }
        }}>{recipe.title}</Link><br />
        <em>{recipe.description}</em>
      </div>
    )
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
