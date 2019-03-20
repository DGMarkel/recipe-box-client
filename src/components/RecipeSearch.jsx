import React, { Component } from 'react'
import RecipeContainer from '../containers/RecipeContainer'

export default class RecipeSearch extends Component {

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state.recipeIngredients)
    return (
      <div className="search-form">
        <h1>Add a New Recipe</h1>
        <form onSubmit={(e) => this.handleOnSubmit(e, this.state.name)}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Ingredient"
            onChange={event => this.handleOnChange(event)}
            />
          <input type="submit" value="Add Ingredients" />
        </form>
        { (this.state.recipeLoaded)
          ? <RecipeContainer ingredients={this.state.recipeIngredients} />
          : <p>Recipe will go here</p>
         }
      </div>
    )
  }
}
