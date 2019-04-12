import React, { Component } from 'react'
import { connect } from 'react-redux'
import RecipesContainer from '../containers/RecipesContainer'

class UserRecipes extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    userRecipes: state
  }
}

export default connect(mapStateToProps)(UserRecipes)
