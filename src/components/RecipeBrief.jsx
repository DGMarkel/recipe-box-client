import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import './RecipeBrief.css'

class RecipeBrief extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  render() {
    return (
      <div className="recipe-card" key={this.props.index}>
        <div className="recipe-header">
          <h3 className="title">{this.props.recipe.title}</h3>
          <h3 className="calorie-count">{this.props.recipe.recipe_totals.calories} Calories</h3>
        </div>
        <img src={this.props.recipe.image_url} />
        <div class="container">
          <Link to={{
            pathname: `recipes/${this.formatRecipeURL(this.props.recipe.title)}`,
            state: {
              recipe: this.props.recipe
            }
            }}>

          </Link><br />
          <p>{this.props.recipe.description}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(RecipeBrief)
