import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import RecipeBrief from './RecipeBrief'

class UserRecipesList extends Component {

  formatRecipeURL = recipe => {
    return recipe.toLowerCase().replace(/\s/g , "-")
  }

  render() {
    return (
      <div>
        { (this.props.recipes)
            ? this.props.recipes.map((recipe, index) =>
              <>
                <RecipeBrief recipe={recipe} index={index} />
                <Link to={{
                  pathname: `/recipes/${this.formatRecipeURL(recipe.title)}/edit`,
                  state: {
                    recipe: recipe
                  }
                }}>Edit</Link>
              </>
            )
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
