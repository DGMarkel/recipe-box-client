import React, { Component } from 'react'
import NewRecipeForm from '../containers/NewRecipeForm'

export default class DashBoard extends Component {

  render() {
    return (
      <div>
        <p>Welcome, {this.props.user.name}</p>
        <p>You've added { this.props.user.recipes.length > 0 ? this.props.user.recipes.length : 0 } recipe(s) since you joined.</p>
        <NewRecipeForm />
      </div>
    )
  }
}
