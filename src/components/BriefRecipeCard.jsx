import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Component.css'

class BriefRecipeCard extends Component {

  renderRecipeCard = () => {
    return (
      <div>
        <div className="recipe-header">
          <div className="recipe-card-image" style={{background: `url(${this.props.recipe.image_url})`, backgroundSize: '150%'}}>
          </div>
        </div>

        <div className="container">
          <h3 className="title">{this.props.recipe.title}</h3>
          { (this.props.user)
              ?  <Link to={{pathname: `/recipes/${this.props.formatRecipeURL(this.props.recipe.title)}/edit`, state: {recipe: this.props.recipe}}}>
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
        pathname: `recipes/${this.props.formatRecipeURL(this.props.recipe.title)}`,
        state: {recipe: this.props.recipe}
      }}>
        {this.renderRecipeCard()}
      </Link>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username, // unused, can be used to display author of recipe's name
    formatRecipeURL: state.formatRecipeURL
  }
}

export default withRouter(connect(mapStateToProps)(BriefRecipeCard))
