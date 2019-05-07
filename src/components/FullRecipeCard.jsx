import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import IngredientsTable from '../components/IngredientsTable'
import NutritionalTable from '../components/NutritionalTable'

class FullRecipeCard extends Component {
  constructor() {
    super()
    this.state={
      ingredientsTableToggled: false,
      nutritionTableToggled: true
    }
  }

  recipe = this.props.location.state.recipe

  renderForm = () => {
    if (this.state.nutrionalTableToggled) {
      return (
        <NutritionalTable recipe={this.props.recipe} />
        <button value="View Nutritional Data By Ingredient" onClick={this.formToggler} />
      )
    }
    if (this.state.ingredientsTableToggled) {
      return (
        <IngredientsTable recipe={this.props.recipe}/>
        <button value="View Nutritional Totals" onClick={this.formToggler} />
      )
    }
  }

  render() {
    console.log(this.recipe)
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.recipe.title}</h1>
          <h4>Calories per serving: {this.recipe.recipe_totals.calories} (actually total calories, need to adjust this later)</h4>
          <p>{this.recipe.description}</p>
          <img src={this.recipe.image_url} alt={this.recipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
          <IngredientsTable recipe={this.recipe} />
          <NutritionalTable recipe={this.recipe} />
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
