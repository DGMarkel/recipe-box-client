import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BriefRecipeCard from './BriefRecipeCard'

class UserRecipesList extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  renderBriefRecipeCards = () => {
    return (
      this.props.recipes.map(recipe =>
        <>
          <BriefRecipeCard recipe={recipe} user_recipe={true} key={recipe.food_name} />
        </>
      )
    )
  }

  render() {
    return (
      <div>
        { (this.props.recipes.length !== 0)
            ? this.renderBriefRecipeCards()
            : <h2>You haven't added any recipes yet</h2>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes
  }
}

export default withRouter(connect(mapStateToProps)(UserRecipesList))
