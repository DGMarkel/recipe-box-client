import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'

class FullRecipeCard extends Component {

  recipe = this.props.location.state.recipe
  servingData = this.recipe.nutritional_data_per_serving

  render() {
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.recipe.title}</h1>
          <h4>Calories per serving: {this.servingData.calories}</h4>
          <p>{this.recipe.description}</p>
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
