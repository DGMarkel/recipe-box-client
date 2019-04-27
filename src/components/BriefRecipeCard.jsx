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
          <h3 className="title">{this.props.recipe.title}</h3>
        </div>

        <div className="container">
          { (this.props.user_recipe)
              ?  <Link to={{pathname: `/recipes/${this.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}>
                  <button>Edit</button></Link>
              : <></>
          }
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
