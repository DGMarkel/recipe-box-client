import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import IngredientsTable from '../components/IngredientsTable'
import NutritionalTable from '../components/NutritionalTable'

class FullRecipeCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true,
      servingTableToggled: false
    }
  }

  recipe = this.props.location.state.recipe

  formToggler = formType => {
    switch(formType) {
      case 'recipe':
        return (
          this.setState({
            ingredientsTableToggled: false,
            nutritionalTableToggled: true,
            servingTableToggled: false
          })
        )
      case 'serving':
        return (
          this.setState({
            ingredientsTableToggled: false,
            nutritionalTableToggled: false,
            servingTableToggled: true
          })
        )
      case 'ingredient':
        return (
          this.setState({
            ingredientsTableToggled: true,
            nutritionalTableToggled: false,
            servingTableToggled: false
          })
        )
    }
  }

  renderForm = () => {
    if (this.state.nutritionalTableToggled) {
      return <NutritionalTable recipe={this.recipe} />
    }
    if (this.state.ingredientsTableToggled) {
      return <IngredientsTable recipe={this.recipe}/>
    }
    if (this.state.servingTableToggled) {
      return <NutritionalTable recipe={this.recipe} serving="true" />
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.recipe.title}</h1>
          <p>{this.recipe.description}</p>
          <img src={this.recipe.image_url} alt={this.recipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
            <a href="#" onClick={()=>this.formToggler('recipe')}>By Recipe</a> |
            <a href="#" onClick={()=>this.formToggler('serving')}> By Serving</a> |
            <a href="#" onClick={()=>this.formToggler('ingredient')}> By Ingredient</a>
          { this.renderForm() }
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
