import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class RecipeBrief extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  render() {
    return (
      <div className="ingredientsList" key={this.props.index}>
        <Link to={{
          pathname: `recipes/${this.formatRecipeURL(this.props.recipe.title)}`,
          state: {
            recipe: this.props.recipe
          }
        }}>
        {this.props.recipe.title}</Link><br />
        <em>{this.props.recipe.description}</em>
        <img src={this.props.recipe.image_url} />
      </div>
    )
  }
}

export default withRouter(RecipeBrief)
