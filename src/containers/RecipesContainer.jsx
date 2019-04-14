import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'

class RecipesContainer extends Component {

  recipe = this.props.location.state.recipe

  render() {
    return (
      <div className="recipe-card">
        <h1>{this.recipe.title}</h1>
        <p>{this.recipe.description}</p>
        <IngredientsTable recipe={this.recipe} />
      </div>
    )
  }
}

export default withRouter(RecipesContainer)
