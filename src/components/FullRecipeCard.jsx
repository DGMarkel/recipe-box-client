import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import IngredientsTable from './IngredientComponents/IngredientsTable'
import NutritionalTable from './NutritionalTable'

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

  // display edit link if user owns viewed recipe
  editLink = () => {
    return (this.props.username === this.recipe.creator_name)
      ? <Link
          to={{pathname: `/recipes/${this.props.formatRecipeURL(this.recipe.title)}/edit`, state: {recipe: this.recipe}}}
        > | Edit</Link>
      : <></>
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
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.recipe.title}</h1>
          <p>{this.recipe.description}</p>
          <img src={this.recipe.image_url} alt={this.recipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
            <span className="fake-link" onClick={()=>this.formToggler('recipe')}>By Recipe</span> |
            <span className="fake-link" onClick={()=>this.formToggler('serving')}> By Serving</span> |
            <span className="fake-link" onClick={()=>this.formToggler('ingredient')}> By Ingredient</span>
          { this.editLink() }
          { this.renderForm() }
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

export default withRouter(connect(mapStateToProps)(FullRecipeCard))
