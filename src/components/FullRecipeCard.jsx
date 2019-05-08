import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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

  showEditLink = () => {
    debugger
    if (this.recipe.creator_name === this.props.creatorName) {
      return <a href={{pathname: `/recipes/${this.props.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}> | Edit</a>
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
          { this.showEditLink() }
          { this.renderForm() }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    creatorName: state.user.username,
    formatRecipeURL: state.formatRecipeURL
  }
}

export default withRouter(connect(mapStateToProps)(FullRecipeCard))
