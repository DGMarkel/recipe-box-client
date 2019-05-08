import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import RecipeDetails from '../components/RecipeComponents/RecipeDetails'
import EditRecipeDetails from '../components/RecipeComponents/EditRecipeDetails'
import IngredientsTable from '../components/Tables/IngredientsTable'
import NutritionalTable from '../components/Tables/NutritionalTable'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true,
      servingTableToggled: false,
      editDetailsToggled: false
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

  // display edit link if user owns viewed recipe
  editIngredientsLink = () => {
    if (this.props.username === this.recipe.creator_name) {
      return (
        <Link to={{pathname: `/recipes/${this.props.formatRecipeURL(this.recipe.title)}/edit`, state: {recipe: this.recipe}}}> | Edit</Link>
      )
    }
  }

  renderIngredientsTables = () => {
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

  renderDetailsOrForm = () => {
    return (
      this.state.editDetailsToggled
      ? <EditRecipeDetails recipe={this.recipe} />
      : <RecipeDetails recipe={this.recipe} />
    )
  }

  render() {
    return (
      <>
        <div className="full-recipe-card">
          { this.renderDetailsOrForm() }
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
            <span className="fake-link" onClick={()=>this.formToggler('recipe')}>By Recipe</span> |
            <span className="fake-link" onClick={()=>this.formToggler('serving')}> By Serving</span> |
            <span className="fake-link" onClick={()=>this.formToggler('ingredient')}> By Ingredient</span>
          { this.editIngredientsLink() }
          { this.renderIngredientsTables() }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    formatRecipeURL: state.formatRecipeURL
  }
}

export default withRouter(connect(mapStateToProps)(Recipe))
