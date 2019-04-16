import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import RecipeCard from '../components/RecipeCard'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.location.state.recipe.id,
      title: props.location.state.recipe.title,
      image_url: props.location.state.recipe.image_url,
      description: props.location.state.recipe.description,
      ingredients: props.location.state.recipe.ingredients
    }
  }

  handleOnChange = event => {
    const ingredients = event.target.name;
    const value = event.target.value;
    this.setState({
      [ingredients]: value
    });
  }

  render() {
    return (
      <>
        <form>
        
        </form>
      </>
    )
  }
}

export default withRouter(EditRecipe)
