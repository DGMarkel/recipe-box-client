import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'
import './FullRecipeCard.css'

class FullRecipeCard extends Component {

  recipe = this.props.location.state.recipe

  recipe_totals = this.recipe.recipe_totals

  render() {
    console.log(this.recipe_totals)
    return (
      <>
        <div className="recipe-card">
          <h1>{this.recipe.title}</h1>
          <em>{this.recipe.description}</em>
          <img src={this.recipe.image_url} />
        </div>
        <div className="ingredients-table">
          <IngredientsTable recipe={this.recipe} />
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
