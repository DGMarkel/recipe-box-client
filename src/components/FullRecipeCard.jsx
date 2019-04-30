import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'
import Auth from '../modules/Auth'

class FullRecipeCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: '',
        title: '',
        image_url: '',
        description: '',
        ingredients: [],
        recipe_totals: []
      }
    }
  }

  componentDidMount() {
    fetch(`/recipes/${this.props.location.state.recipe.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
    .then(res => {
      this.setState({
        recipe: {
          id: res.id,
          title: res.title,
          description: res.description,
          image_url: res.image_url,
          ingredients: res.ingredients,
          recipe_totals: res.recipe_totals
        }
      })
    })
  }

  render() {
    console.log(this.state.recipe.recipe_totals)
    return (
      <>
        <div className="full-recipe-card">
          <h1>{this.state.recipe.title}</h1>
          <em>{this.state.recipe.description}</em>
          <img src={this.state.recipe.image_url} alt={this.state.recipe.title} />
        </div>
        <div className="ingredients-table">
          <h1>Nutritional Data</h1>
          <IngredientsTable recipe={this.state.recipe} />
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
