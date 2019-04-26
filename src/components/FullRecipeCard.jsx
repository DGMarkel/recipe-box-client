import React, { Component } from 'react'
import IngredientsTable from '../components/IngredientsTable'
import { withRouter } from 'react-router-dom'
import './FullRecipeCard.css'
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
        ingredients: []
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
          ingredients: res.ingredients
        }
      })
    })
  }

  render() {
    return (
      <>
        <div className="recipe-card">
          <h1>{this.recipe.title}</h1>
          <em>{this.recipe.description}</em>
          <img src={this.recipe.image_url} />
        </div>
        <div className="ingredients-table">
          <IngredientsTable recipe={this.recipe} />
        </div>
      </>
    )
  }
}

export default withRouter(FullRecipeCard)
