import React, { Component } from 'react'
import RecipeForm from '../containers/RecipeForm'

export default class DashBoard extends Component {

  render() {
    return (
      <div>
        <p>Welcome, {this.props.user.name}</p>
        <p>You've added {this.props.user.recipes.length} recipe(s) since you joined.</p>
        <RecipeForm />
      </div>
    )
  }
}
