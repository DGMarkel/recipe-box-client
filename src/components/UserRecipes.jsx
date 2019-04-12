import React, { Component } from 'react'
import { connect } from 'react-redux'
import RecipesContainer from '../containers/RecipesContainer'

class UserRecipes extends Component {

  render() {
    console.log(this.props.userRecipes)
    return (
      <div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    userRecipes: state.user.recipes
  }
}

export default connect(mapStateToProps)(UserRecipes)
