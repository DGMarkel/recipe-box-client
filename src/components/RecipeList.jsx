import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'

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

  render() {
    console.log(this.state.recipes)
    return (
      <Router>
        <div>
          { (this.state.recipesLoaded)
            ? this.state.recipes.map( recipe =>
              <div>
              <Link to={"/recipes/" + recipe.title}>{recipe.title}</Link>
              <Route
                exact path={"/recipes/" + recipe.title}
                
              />
              </div>
            )
            : <p>Loading...</p>
          }
        </div>
      </Router>
    )
  }
}
