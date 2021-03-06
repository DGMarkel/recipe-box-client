import React, { Component } from 'react'

export default class EditRecipeDetails extends Component {
  render() {
    return (
      <>
      <h1>{this.props.recipe.title}</h1>
      <span className="fake-link" onClick={()=>this.props.editDetailsToggler()}>Close Edit Form</span>
      <form onSubmit={e=>this.props.updateRecipeDetails(e, this.props.recipe)}>
        <textarea
          cols="60"
          name="title"
          value={this.props.recipe.title}
          placeholder="Title"
          onChange={event => this.props.handleOnChangeForRecipeDetails(event, this.props.recipe.id)}
          /><br />
        <textarea
          cols="60"
          name="image_url"
          value={this.props.recipe.image_url}
          placeholder="Image"
          onChange={event => this.props.handleOnChangeForRecipeDetails(event, this.props.recipe.id)}
        /><br />
        Servings: <input
          type="number"
          name="servings"
          value={this.props.recipe.servings}
          onChange={event => this.props.handleOnChangeForRecipeDetails(event, this.props.recipe.id)}
        /><br />
        <textarea
          cols="60"
          name="description"
          value={this.props.recipe.description}
          placeholder="Brief Description"
          onChange={event => this.props.handleOnChangeForRecipeDetails(event, this.props.recipe.id)}
        /><br />
        <input type="submit" value="Update Recipe Details" /><br />
      </form>
      </>
    )
  }
}
