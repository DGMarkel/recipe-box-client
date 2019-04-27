import React, { Component } from 'react'

import './NewRecipeForm.css'

import NewRecipeContainer from '..components/NewRecipeContainer'
import NewRecipeForm from '..components/NewRecipeForm'

export default class NewRecipe extends Component {
  render() {
    return (
      <NewRecipeContainer />
      <NewRecipeForm />
    )
  }
}
