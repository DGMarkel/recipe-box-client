import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './BriefRecipeCard.css'

class BriefRecipeCard extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  renderRecipeCard = () => {
    return (
      <div>

        <div className="recipe-header">
          <div className="recipe-card-image" style={{background: `url(${this.props.recipe.image_url})`, backgroundSize: '150%'}}>
          </div>
        </div>

        <div className="container">
          <p className="title">{this.props.recipe.title}</p>
          { (this.props.user_recipe)
              ?  <Link to={{pathname: `/recipes/${this.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}>
                  <button>Edit</button></Link>
              : <></>
          }
          <p className="description">{this.props.recipe.description}</p>
        </div>

      </div>
    )
  }

  render() {
    return (
      <Link to={{
        pathname: `recipes/${this.formatRecipeURL(this.props.recipe.title)}`,
        state: {recipe: this.props.recipe}
      }}>
        {this.renderRecipeCard()}
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

export default withRouter(connect(mapStateToProps)(BriefRecipeCard))
