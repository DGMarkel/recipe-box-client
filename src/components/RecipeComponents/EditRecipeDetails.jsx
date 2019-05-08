import React, { Component } from 'react'
import Auth from '../../modules/Auth'

export default class EditRecipeDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: props.recipe.id,
        title: props.recipe.title,
        image_url: props.recipe.image_url,
        description: props.recipe.description,
        servings: props.recipe.servings
      }
    }
  }

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      ...this.state,
        recipe: {
          ...this.state.recipe,
          [name]: value
        }
    })
  }

  // updates recipe title, description, and image_url on backend
  updateRecipeDetails = e => {
    e.preventDefault();

    fetch('/edit-recipe', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: this.state.recipe
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={e=>this.updateRecipeDetails(e)}>
        <textarea
          cols="60"
          name="title"
          value={this.state.recipe.title}
          placeholder="Title"
          onChange={event => this.handleOnChange(event)}
          /><br />
        <textarea
          cols="60"
          name="image_url"
          value={this.state.recipe.image_url}
          placeholder="Image"
          onChange={event => this.handleOnChange(event)}
        /><br />
        Servings: <input
          type="number"
          name="servings"
          value={this.state.recipe.servings}
          onChange={event => this.handleOnChange(event)}
        /><br />
        <textarea
          cols="60"
          name="description"
          value={this.state.recipe.description}
          placeholder="Brief Description"
          onChange={event => this.handleOnChange(event)}
        /><br />
        <input type="submit" value="Update" />
      </form>
    )
  }
}
