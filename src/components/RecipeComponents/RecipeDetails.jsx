import React, { Component } from 'react'

export default class RecipeDetails extends Component {
  render() {
    return (
      <div className="full-recipe-card">
        <h1>{this.recipe.title}</h1>
        <p>{this.recipe.description}</p>
        <img src={this.recipe.image_url} alt={this.recipe.title} />
      </div>
    )
  }
}
