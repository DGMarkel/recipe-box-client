import React, { Component } from 'react'

export default class RecipeDetails extends Component {
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
