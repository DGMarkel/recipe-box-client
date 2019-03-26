import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import RecipesContainer from '../containers/RecipesContainer'

export default class RecipeList extends Component {
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
        <Link to={"/recipes/" + recipe.title}>{recipe.title}</Link>
        <Route
          exact path={"/recipes/" + recipe.title}
          render={()=><RecipesContainer recipe={recipe} />}
        />
      </div>
    )
  }

  render() {

    return (
      <Router>
        <div>
          { (this.state.recipesLoaded)
            ? this.state.recipes.map( (recipe, index) =>
              { return this.renderRecipeIngredients(recipe, index) }
            )
            : <p>Loading...</p>
          }
        </div>
      </Router>
    )
  }
}
