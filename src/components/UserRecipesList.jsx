import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/RecipeActions'

class UserRecipesList extends Component {

  render() {
    console.log(this.props.recipes)
    return (
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes
  }
}

export default connect(mapStateToProps)(UserRecipesList)
