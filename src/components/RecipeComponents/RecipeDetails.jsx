import React, { Component } from 'react'

export default class RecipeDetails extends Component {

  render() {
    return (
      <div className="full-recipe-card">
        <h1>{this.props.recipe.title}</h1>
        <p>{this.props.recipe.description}</p>
        <img src={this.props.recipe.image_url} alt={this.props.recipe.title} />
      </div>
    )
  }
}
