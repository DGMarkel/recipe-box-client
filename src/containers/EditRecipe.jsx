import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Auth from '../modules/Auth'

import RecipeCard from '../components/RecipeCard'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.location.state.recipe.id,
      title: '',
      image_url: '',
      description: '',
      ingredients: ''
    }
  }

  editRecipe = (e, data) => {
    e.preventDefault();
    fetch('/edit', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: data
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

  renderIngredientsInForm = () => {
    return this.state.ingredients.map(ingredient => {
      console.log(ingredient)
      return (
        <div className="ingredient">
          <h3>{ingredient.food_name}</h3>
          <p>Calories: {ingredient.calories} Total Fat: {ingredient.total_fat} Protein: {ingredient.protein} Carbs: {ingredient.total_carbohydrate}</p>
          Quantity: <input type="text" value={ingredient.serving_qty} onChange={e=>this.handleOnChange(e)} />
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
        <form onSubmit={e => {this.editRecipe(e, this.state)}}>
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
