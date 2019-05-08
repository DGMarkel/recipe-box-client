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
          to={{pathname: `/recipes/${this.props.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}
        > | Edit</Link>
      : <></>
  }

  renderForm = () => {
    if (this.state.nutritionalTableToggled) {
      return <NutritionalTable recipe={this.props.recipe} />
    }
    if (this.state.ingredientsTableToggled) {
      return <IngredientsTable recipe={this.props.recipe}/>
    }
    if (this.state.servingTableToggled) {
      return <NutritionalTable recipe={this.props.recipe} serving="true" />
    }
  }

  render() {
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.props.recipe.title}</h1>
          <p>{this.props.recipe.description}</p>
          <img src={this.props.recipe.image_url} alt={this.recipe.title} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    formatRecipeURL: state.formatRecipeURL,
    recipe: state.user.recipes.find(recipe => recipe.id === ownProps.location.state.recipe.id)
  }
}

export default withRouter(connect(mapStateToProps)(Recipe))
