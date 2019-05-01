import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'

class FullRecipeCard extends Component {

  recipe = this.props.location.state.recipe

  render() {
    console.log(this.recipe)
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.recipe.title}</h1>
          <p>{this.recipe.description}</p>
          <h4>Calories: {this.recipe.recipe_totals.calories}</h4>
          <img src={this.recipe.image_url} alt={this.recipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
          <IngredientsTable recipe={this.recipe} />
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
