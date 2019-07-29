import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { formatRecipeURL, sumNutritionalDataFor } from '../../modules/Helpers'

import '../Component.css'

class BriefRecipeCard extends Component {

  // shortens recipe descriptions to fit recipe card
  shortDescription = description => {
    const shortDescription = description.substr(0, 80) // creates 80 char substring of description
    // ensures last character of substring is not a space, adds an ellipsis
    return shortDescription.substr(0, Math.min(shortDescription.length, shortDescription.lastIndexOf(" "))).concat("...")
  }

  calsPerServing = recipe => {
    return (recipe.ingredients && recipe.servings > 0) ? Math.round(sumNutritionalDataFor(recipe.ingredients, "calories")/recipe.servings) : <p>Unavailable</p>
  }

  render() {
    return (
      <div className="recipe-card">
        <Link to={{
          pathname: `recipes/${formatRecipeURL(this.props.recipe.title)}`,
          state: {recipe: this.props.recipe}
        }}>
          <div className="recipe-header">
            <div className="recipe-card-image" style={{background: `url(${this.props.recipe.image_url})`, backgroundSize: '150%'}}>
              <div className="cals-per-serving">
                Calories/serving: { this.calsPerServing(this.props.recipe) }
              </div>
            </div>
          </div>

          <div className="container">
            <h3 className="title">{this.props.recipe.title}</h3>
            <p className="description">{this.shortDescription(this.props.recipe.description)}</p>
          </div>
        </Link>
      </div>
    )
  }
}

export default withRouter(BriefRecipeCard)
