import React, { Component } from 'react'
import RecipeSearch from './RecipeSearch'

export default class DashBoard extends Component {

  render() {
    console.log(this.props.user)
    return (

      <div>
        <p>Welcome, {this.props.user.name}</p>
        <p>You've added {this.props.user.recipes.length} recipe(s) since you joined.</p>
        <RecipeSearch />
      </div>
    )
  }
}
