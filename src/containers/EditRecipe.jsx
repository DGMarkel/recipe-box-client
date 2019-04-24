import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'
import Auth from '../modules/Auth'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.location.state.recipe.id,
      title: props.location.state.recipe.title,
      image_url: props.location.state.recipe.image_url,
      description: props.location.state.recipe.description,
      ingredients: props.location.state.recipe.ingredients
    }
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  renderIngredientsInForm = () => {
    return this.state.ingredients.map((ingredient, index) => {
      return (
        <div className="ingredient">
          <h3>{ingredient.food_name}</h3>
          <p>Calories: {ingredient.calories} Total Fat: {ingredient.total_fat} Protein: {ingredient.protein} Carbs: {ingredient.total_carbohydrate}</p>
          Quantity:
            <input
              type="text"
              name="serving_qty"
              value={ingredient.serving_qty}
            />
          Serving Unit:
            <input
              type="text"
              name="serving_unit"
              value={ingredient.serving_unit}
            /><br />
          <input type="submit" value={`Delete ${ingredient.food_name}`} onClick={e => {this.deleteIngredient(e, ingredient, index)}}/>
          <hr />
        </div>
      )
    })
  }

  render() {
    return (
      <>
        <form>
          <textarea
            cols="60"
            name="title"
            value={this.state.title}
            placeholder="Title"
            onChange={event => this.handleOnChange(event)}
            /><br />
            <textarea
              cols="60"
              name="image_url"
              value={this.state.image_url}
              placeholder="Image"
              onChange={event => this.handleOnChange(event)}
              /><br />
          <textarea
            cols="60"
            name="description"
            value={this.state.description}
            placeholder="Brief Description"
            onChange={event => this.handleOnChange(event)}
          /><br />
          { this.renderIngredientsInForm() }
          <input type="submit" value="Update Recipe"/>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecipe: bindActionCreators(actions.updateRecipe, dispatch),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(EditRecipe))
