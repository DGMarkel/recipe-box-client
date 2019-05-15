import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/RecipeActions'

import IngredientsTable from '../components/Tables/IngredientsTable'
import NutritionalTable from '../components/Tables/NutritionalTable'
import EditRecipeDetails from '../components/RecipeComponents/EditRecipeDetails'
import RecipeDetails from '../components/RecipeComponents/RecipeDetails'
import EditIngredients from '../components/Tables/EditIngredients'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true,
      servingTableToggled: false,
      editRecipeDetails: false,
      editIngredientsToggled: false
    }
  }

  tableToggler = tableType => {
    switch(tableType) {
      case 'recipe':
        return (
          this.setState({
            ingredientsTableToggled: false,
            nutritionalTableToggled: true,
            servingTableToggled: false,
            editIngredientsToggled: false
          })
        )
      case 'serving':
        return (
          this.setState({
            ingredientsTableToggled: false,
            nutritionalTableToggled: false,
            servingTableToggled: true,
            editIngredientsToggled: false
          })
        )
      case 'ingredient':
        return (
          this.setState({
            ingredientsTableToggled: true,
            nutritionalTableToggled: false,
            servingTableToggled: false,
            editIngredientsToggled: false
          })
        )
      case 'edit':
        return (
          this.setState({
            ingredientsTableToggled: false,
            nutritionalTableToggled: false,
            servingTableToggled: false,
            editIngredientsToggled: true
          })
        )
    }
  }

  editDetailsToggler = () => {
    this.setState({
      ...this.state,
        editRecipeDetails: this.state.editRecipeDetails ? false : true
    })
  }

  renderTable = () => {
    if (this.state.nutritionalTableToggled) {
      return <NutritionalTable recipe={this.props.recipe} />
    }
    if (this.state.ingredientsTableToggled) {
      return <IngredientsTable recipe={this.props.recipe}/>
    }
    if (this.state.servingTableToggled) {
      return <NutritionalTable recipe={this.props.recipe} serving="true" />
    }
    if (this.state.editIngredientsToggled) {
      return <EditIngredients recipe={this.props.recipe}/>
    }
  }

  render() {
    return (
      <>
        <div className="full-recipe-card">
          { this.state.editRecipeDetails
             ? <EditRecipeDetails
                  recipe={this.props.recipe}
                  editDetailsToggler={this.editDetailsToggler}
                  editRecipeDetails={this.state.editRecipeDetails}
                  handleOnChangeForRecipeDetails={this.props.handleOnChangeForRecipeDetails}
                  updateRecipeDetails={this.props.updateRecipeDetails}
                />
             : <RecipeDetails recipe={this.props.recipe} username={this.props.username} editDetailsToggler={this.editDetailsToggler}/>
          }
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
            <span className="fake-link" onClick={()=>this.tableToggler('recipe')}>By Recipe</span> |
            <span className="fake-link" onClick={()=>this.tableToggler('serving')}> By Serving</span> |
            <span className="fake-link" onClick={()=>this.tableToggler('ingredient')}> By Ingredient</span>
            { this.props.username === this.props.recipe.creator_name
              ? <span className="fake-link" onClick={()=>this.tableToggler('edit')}> | Edit</span>
              : <></>
            }
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
    recipe: state.recipes.find(recipe => recipe.id === ownProps.location.state.recipe.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnChangeForRecipeDetails: bindActionCreators(actions.handleOnChangeForRecipeDetails, dispatch),
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))
