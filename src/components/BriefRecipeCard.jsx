import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Component.css'

class BriefRecipeCard extends Component {

  // shortens recipe descriptions to fit recipe card
  shortDescription = description => {
    const shortDescription = description.substr(0, 80) // creates 80 char substring of description
    // ensures last character of substring is not a space, adds an ellipsis
    return shortDescription.substr(0, Math.min(shortDescription.length, shortDescription.lastIndexOf(" "))).concat("...")
  }

  calsPerServing = recipe => {
    return this.props.sumNutritionalDataFor(recipe.ingredients, "calories")/recipe.servings
  }

  render() {
    return (
      <Link to={{
        pathname: `recipes/${this.props.formatRecipeURL(this.props.recipe.title)}`,
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
          { (this.props.user)
              ?  <Link to={{pathname: `/recipes/${this.props.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}>
                  <button>Edit</button></Link>
              : <></>
          }
          <p className="description">{this.shortDescription(this.props.recipe.description)}</p>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username, // unused, can be used to display author of recipe's name
    formatRecipeURL: state.formatRecipeURL,
    sumNutritionalDataFor: state.sumNutritionalDataFor
  }
}

export default withRouter(connect(mapStateToProps)(BriefRecipeCard))
