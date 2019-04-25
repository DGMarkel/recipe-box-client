import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import * as actions from '../actions/RecipeActions'
import './EditRecipe.css'

import Auth from '../modules/Auth'
import RecipePreview from '../components/RecipePreview'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: props.recipe.id,
        title: props.recipe.title,
        image_url: props.recipe.image_url,
        description: props.recipe.description,
        ingredients: props.recipe.ingredients
      }
    }
  }

  handleOnChangeForRecipeDetails = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      recipe: {
      ...this.state.recipe,
        [name]: value
      }
    });
  }

  handleOnChangeForIngredients = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedIngredients = this.state.recipe.ingredients
    updatedIngredients[index][name] = value
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: updatedIngredients
      }
    })
  }

  renderIngredientsInForm = () => {
    return this.state.recipe.ingredients.map((ingredient, index) => {
      return (
        <div className="ingredient" key={index}>
          <h3>{ingredient.food_name}</h3>
          Quantity:
            <input
              type="text"
              name="serving_qty"
              value={ingredient.serving_qty}
              onChange={e=>this.handleOnChangeForIngredients(e, index)}
            />
          Serving Unit:
            <input
              type="text"
              name="serving_unit"
              value={ingredient.serving_unit}
              onChange={e=>this.handleOnChangeForIngredients(e, index)}
            /><br />
          <input type="submit" value={`Update ${ingredient.food_name}`} onClick={e => {this.props.updateIngredient(e, this.state.recipe.id, ingredient)} }/>
          <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => {this.props.deleteIngredient(e, this.state.recipe.id, ingredient)} }/>
          <hr />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="recipe-editor">
        <div className="edit-recipe-form">
          <form onSubmit={e => this.props.updateIngredient(e, this.state.recipe)}>
            <textarea
              cols="60"
              name="title"
              value={this.state.recipe.title}
              placeholder="Title"
              onChange={event => this.handleOnChangeForRecipeDetails(event)}
              /><br />
              <textarea
                cols="60"
                name="image_url"
                value={this.state.recipe.image_url}
                placeholder="Image"
                onChange={event => this.handleOnChangeForRecipeDetails(event)}
                /><br />
            <textarea
              cols="60"
              name="description"
              value={this.state.recipe.description}
              placeholder="Brief Description"
              onChange={event => this.handleOnChangeForRecipeDetails(event)}
            /><br />
            { this.renderIngredientsInForm() }
            <input type="submit" value="Update Recipe"/>
          </form>
        </div>
        <div className="recipe-preview">
          <RecipePreview recipe={this.props.recipe} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.user.recipes)
  return {
    recipe: state.user.recipes.find( recipe => recipe.id === ownProps.location.state.recipe.id )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
