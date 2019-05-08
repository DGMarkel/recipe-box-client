import React, { Component } from 'react'

export default class EditRecipeDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: '',
        title: '',
        image_url: '',
        description: '',
        servings: ''
      }
    }
  }

  // updates recipe title, description, and image_url on backend
  updateRecipeDetails = (event, recipe) => {
    event.preventDefault();

    fetch('/edit-recipe', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          servings: recipe.servings
        }
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
      <>
        <textarea
          cols="60"
          name="title"
          value={this.props.recipe.title}
          placeholder="Title"
          onChange={event => this.props.handleOnChange(event)}
          /><br />
        <textarea
          cols="60"
          name="image_url"
          value={this.props.recipe.image_url}
          placeholder="Image"
          onChange={event => this.props.handleOnChange(event)}
        /><br />
        Servings: <input
          type="number"
          name="servings"
          value={this.props.recipe.servings}
          onChange={event => this.props.handleOnChange(event)}
        /><br />
        <textarea
          cols="60"
          name="description"
          value={this.props.recipe.description}
          placeholder="Brief Description"
          onChange={event => this.props.handleOnChange(event)}
        /><br />
      </>
    )
  }
}
