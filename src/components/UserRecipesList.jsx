import React, { Component } from 'react'
import { connect } from 'react-redux'

import RecipeBrief from './RecipeBrief'

class UserRecipesList extends Component {

  render() {
    return (
      <div>
        { (this.props.recipes)
            ? this.props.recipes.map((recipe, index) => <RecipeBrief recipe={recipe} index={index} />)
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

export default connect(mapStateToProps)(UserRecipesList)
