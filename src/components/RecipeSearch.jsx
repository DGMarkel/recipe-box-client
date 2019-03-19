import React, { Component } from 'react'
import RecipeContainer from '../containers/RecipeContainer'

export default class RecipeSearch extends Component {

  constructor() {
    super()
    this.state={
      name: '',
      recipeTitle: '',
      recipeIngredients: [],
      recipeLoaded: false
    }
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = (event, data) => {
    event.preventDefault()
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      body: JSON.stringify({
        query: data
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
      }
      }).then(res => res.json())
      .then(res => {
        console.log(res)
        res.foods.map( ingredient => {
          this.setState({
              recipeIngredients: [
                ...this.state.recipeIngredients.concat(ingredient)],
              recipeLoaded: true
          })
        })
      }).catch(err => console.log(err));
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
