import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import IngredientsTable from '../components/Tables/IngredientsTable'
import NutritionalTable from '../components/Tables/NutritionalTable'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true,
      servingTableToggled: false
    }
  }

  tableToggler = formType => {
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
    return (this.props.username === this.props.currentRecipe.creator_name)
      ? <Link
          to={{pathname: `/recipes/${this.props.formatRecipeURL(this.props.currentRecipe.title)}/edit`, state: {recipe: this.props.currentRecipe}}}
        > | Edit</Link>
      : <></>
  }

  renderTable = () => {
    if (this.state.nutritionalTableToggled) {
      return <NutritionalTable recipe={this.props.currentRecipe} />
    }
    if (this.state.ingredientsTableToggled) {
      return <IngredientsTable recipe={this.props.currentRecipe}/>
    }
    if (this.state.servingTableToggled) {
      return <NutritionalTable recipe={this.props.currentRecipe} serving="true" />
    }
  }

  render() {
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.props.currentRecipe.title}</h1>
          <p>{this.props.currentRecipe.description}</p>
          <img src={this.props.currentRecipe.image_url} alt={this.props.currentRecipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
            <span className="fake-link" onClick={()=>this.tableToggler('recipe')}>By Recipe</span> |
            <span className="fake-link" onClick={()=>this.tableToggler('serving')}> By Serving</span> |
            <span className="fake-link" onClick={()=>this.tableToggler('ingredient')}> By Ingredient</span>
          { this.editLink() }
          { this.renderTable() }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    formatRecipeURL: state.formatRecipeURL,
    currentRecipe: state.user.recipes.find(recipe => recipe.id === ownProps.location.state.recipe.id)
  }
}

export default withRouter(connect(mapStateToProps)(Recipe))
