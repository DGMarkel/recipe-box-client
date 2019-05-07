import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import IngredientsTable from '../components/IngredientsTable'
import NutritionalTable from '../components/NutritionalTable'

class FullRecipeCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true
    }
  }

  recipe = this.props.location.state.recipe

  formToggler = () => {
    if (this.state.ingredientsTableToggled) {
      this.setState({
        ingredientsTableToggled: false,
        nutritionalTableToggled: true
      })
    }
    if (this.state.nutritionalTableToggled) {
      this.setState({
        ingredientsTableToggled: true,
        nutritionalTableToggled: false
      })
    }
  }

  buttonToggler = () => {
    return this.state.ingredientsTableToggled
      ? <button onClick={()=>this.formToggler()}>View Nutritional Data By Recipe</button>
      : <button onClick={()=>this.formToggler()}>View Nutritional Data By Ingredient</button>
  }



  renderForm = () => {
    return (
      this.state.nutritionalTableToggled
      ? <NutritionalTable recipe={this.recipe} />
      : <IngredientsTable recipe={this.recipe}/>
    )
  }

  render() {
    console.log(this.state)
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
          { this.buttonToggler() }
          { this.renderForm() }
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
