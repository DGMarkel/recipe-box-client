import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'
import Auth from '../modules/Auth'

import RecipeCard from '../components/RecipeCard'

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

  editRecipe = (e, recipe) => {
    e.preventDefault();
    fetch('/edit', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          ingredients: recipe.ingredients
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
    .then(res => {
      console.log('success')
    }).catch(err => {
      console.log(err);
    })
  }


  handleOnChange = event => {
    const ingredients = event.target.name;
    const value = event.target.value;
    this.setState({
      [ingredients]: value
    });
  }

  handleIngredientUpdate = (e, index) => {
    const data_type = e.target.name;
    const portion_data = e.target.value;
    let new_ingredients = [...this.state.ingredients];
    let ingredient = {...new_ingredients[index]};
    ingredient[data_type] = portion_data;
    new_ingredients[index] = ingredient
    this.setState({
      ingredients: new_ingredients
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
              onChange={e=>this.handleIngredientUpdate(e, index)}
            />
          Serving Unit:
            <input
              type="text"
              name="serving_unit"
              value={ingredient.serving_unit}
              onChange={e=>this.handleIngredientUpdate(e, index)}
            /><br />
          <input type="submit" value={`Delete ${ingredient.food_name}`}/>
          <hr />
        </div>
      )
    })
  }

  render() {
    return (
      <>
        <form onSubmit={e => {this.props.updateRecipe(e, this.state)}}>
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
          <input type="submit" value="Update Recipe" />
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecipe: bindActionCreators(actions.updateRecipe, dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(EditRecipe))
