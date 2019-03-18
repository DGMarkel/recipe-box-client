import React, { Component } from 'react'

export default class RecipeSearch extends Component {

  constructor() {
    super()
    this.state={
      name: ''
    }
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state.name)
    return {
      <div className="search-form">
        <h1>Add a New Recipe</h1>
        <form>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Ingredient"
            onChange={event => this.handleOnchange(event)}
            />
          <input type="submit" value="Add Ingredient" />
        </form>
      </div>
    }
  }
}
