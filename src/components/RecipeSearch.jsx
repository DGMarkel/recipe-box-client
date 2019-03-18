import React, { Component } from 'react'

export default class RecipeSearch extends Component {

  constructor() {
    super()
    this.state={
      name: ''
    }
  }

  render() {
    return {
      <div className="search-form">
        <h1>Add a New Recipe</h1>
        <form>
          <input type="text" placeholder="Ingredient" />
          <input type="submit" value="Add Ingredient" />
        </form>
      </div>
    }
  }
}
