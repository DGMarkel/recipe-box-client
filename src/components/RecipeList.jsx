import React, { Component } from 'react'

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
          recipes: resJSON.recipes,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
  }

  render() {
    console.log(this.state.recipes)
    return (
      <div>
        { (this.state.recipesLoaded)
          ? this.state.recipes.map( recipe => { return <h1>{recipe.title}</h1> })
          : <p>Loading...</p>
        }
      </div>
    )
  }
}
