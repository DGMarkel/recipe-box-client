import React, { Component } from 'react'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class EditRecipe extends Component {
  render() {
    console.log('hi')
    return (
      <></>
    )
  }
}

export default withRouter(EditRecipe)
