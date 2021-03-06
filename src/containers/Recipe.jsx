import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions/RecipeActions'

import IngredientsTable from '../components/Tables/IngredientsTable'
import NutritionalTable from '../components/Tables/NutritionalTable'
import RecipeDetails from '../components/RecipeComponents/RecipeDetails'
import EditRecipeDetails from '../components/RecipeComponents/EditRecipeDetails'
import EditIngredients from '../components/Tables/EditIngredients'
import AddIngredientsForm from '../components/IngredientComponents/AddIngredientsForm'

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state={
      ingredientsTableToggled: false,
      nutritionalTableToggled: true,
      servingTableToggled: false,
      editIngredientsToggled: false,
      addIngredientsToggled: false,
      editRecipeDetails: false,
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
      default:
        console.log("No changes made to state")
    }
  }

  editDetailsToggler = () => {
    this.setState({
      ...this.state,
        editRecipeDetails: this.state.editRecipeDetails ? false : true
    })
  }

  addIngredientsToggler = () => {
    this.setState({
      addIngredientsToggled: (this.state.addIngredientsToggled) ? false : true
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
      return (
        <>
          <EditIngredients
            handleOnChangeForIngredients={this.props.handleOnChangeForIngredients}
            updateIngredient={this.props.updateIngredient}
            deleteIngredient={this.props.deleteIngredient}
            ingredients={this.props.recipe.ingredients}
            recipeID={this.props.recipe.id}
          />
          { this.state.addIngredientsToggled
            ? <AddIngredientsForm
                addIngredientsToggler={this.addIngredientsToggler}
                fetchAndPostIngredients={this.props.fetchAndPostIngredients}
                recipe={this.props.recipe}
              />
            : <button onClick={()=>this.addIngredientsToggler()}>Add Ingredients</button>
          }
        </>
      )
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
    // below compares lowercased recipe title from state to current, reformatted slug 
    recipe: state.recipes.find(recipe => recipe.title.toLowerCase() === ownProps.location.pathname.split("/")[2].split("-").join(" "))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnChangeForRecipeDetails: bindActionCreators(actions.handleOnChangeForRecipeDetails, dispatch),
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    handleOnChangeForIngredients: bindActionCreators(actions.handleOnChangeForIngredients, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    fetchAndPostIngredients: bindActionCreators(actions.fetchAndPostIngredients, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))
