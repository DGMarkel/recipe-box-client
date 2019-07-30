import React, { Component } from 'react'

export default class RecipeDetails extends Component {

  displayImage = () => {
    return this.props.recipe.image_url ? this.props.recipe.image_url : 'https://wallpaperaccess.com/full/512858.jpg'
  }

  render() {
    return (
      <>
        <h1>{this.props.recipe.title}</h1>
        { this.props.username === this.props.recipe.creator_name
          ? <span className="fake-link" onClick={()=>this.props.editDetailsToggler()}>Edit Recipe Details</span>
          : <></>
        }
        <p>{this.props.recipe.description}</p>
        <img src={this.displayImage()} />
      </>
    )
  }
}
