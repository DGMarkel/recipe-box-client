import React, { Component } from 'react'
import Recipes from '../components/RecipeList'

export default class DashBoard extends Component {

  render() {
    return (
      <div>
        <Recipes />
      </div>
    )
  }
}
