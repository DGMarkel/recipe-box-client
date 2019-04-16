import React, { Component } from 'react'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state={
      id: props.location.state.recipe.id,
      title: props.location.state.recipe.title,
      image_url: props.location.state.recipe.image_url,
      description: props.location.state.recipe.description,
      ingredients: props.location.state.recipe.ingredients
    }
  }

  render() {
    return (
      <></>
    )
  }
}

export default withRouter(EditRecipe)
