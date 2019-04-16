import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

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

  handleOnChange = event => {
    const ingredients = event.target.name;
    const value = event.target.value;
    this.setState({
      [ingredients]: value
    });
  }

  renderIngredientsInForm = () => {
    return this.state.ingredients.map(ingredient => {
      console.log(ingredient)
      return (
        <div className="ingredient">
          <h3>{ingredient.food_name}</h3>
          <p>Calories: {ingredient.calories} Total Fat: {ingredient.total_fat} Protein: {ingredient.protein} Carbs: {ingredient.total_carbohydrate}</p>
          Quantity: <input type="text" value={ingredient.serving_qty} />
          Serving Unit: <input type="text" value={ingredient.serving_unit} /><br />
          <input type="submit" value={`Delete ${ingredient.food_name}`}/>
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
        </form>
      </>
    )
  }
}

export default withRouter(EditRecipe)
