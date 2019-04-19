import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import './RecipeBrief.css'

class RecipeBrief extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  render() {
    return (
      <div className="recipe_card" key={this.props.index}>
        <img src={this.props.recipe.image_url} />
        <div class="container">
          <Link to={{
            pathname: `recipes/${this.formatRecipeURL(this.props.recipe.title)}`,
            state: {
              recipe: this.props.recipe
            }
            }}>
            {this.props.recipe.title}
          </Link><br />
          <p>{this.props.recipe.description}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(RecipeBrief)
