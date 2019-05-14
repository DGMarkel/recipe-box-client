import React, { Component } from 'react'

export default class RecipeDetails extends Component {

  render() {
    return (
      <>
        <h1>{this.props.recipe.title}</h1>
        { this.props.username === this.props.recipe.creator_name
          ? <span className="fake-link" onClick={()=>this.props.editToggler()}>Edit Recipe Details</span>
          : <></>
        }
        <p>{this.props.recipe.description}</p>
        <img src={this.props.recipe.image_url} alt={this.props.recipe.title} />
      </>
    )
  }
}
