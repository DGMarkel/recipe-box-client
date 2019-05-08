import React, { Component } from 'react'

export default class RecipeDetails extends Component {
  render() {
    return (
      <>
        <h1>{this.props.recipe.title}</h1>
        <p>{this.props.recipe.description}</p>
        { this.props.owner ? <span className="fake-link">Edit Recipe Details</span> : <></> }
        <img src={this.props.recipe.image_url} alt={this.props.recipe.title} />
      </>
    )
  }
}
