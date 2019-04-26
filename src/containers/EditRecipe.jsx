import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'
import EditIngredients from '../components/EditIngredients'

import Auth from '../modules/Auth'

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {
        id: '',
        title: '',
        image_url: '',
        description: '',
        ingredients: []
      },
      toggleAddIngredients: false,
      rawIngredients: ''
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

  handleOnChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleOnChangeForRecipeDetails = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      recipe: {
      ...this.state.recipe,
        [name]: value
      }
    });
  }

  handleOnChangeForIngredients = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedIngredients = this.state.recipe.ingredients
    updatedIngredients[index][name] = value
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: updatedIngredients
      }
    })
  }

  renderAddIngredientsForm = () => {
    return (
      <form onSubmit={e => {this.props.fetchIngredients(e, this.state); this.setState({toggleAddIngredients: false})} }>
        <textarea
          rows="10"
          cols="60"
          name="rawIngredients"
          value={this.state.rawIngredients}
          placeholder="Ingredient"
          onChange={e => this.handleOnChange(e)}
          /><br />
        <input type="submit" value="Save Ingredients"/>
      </form>
    )
  }



  render() {
    return (
      <>
        <form onSubmit={e => this.props.updateRecipeDetails(e, this.state.recipe)}>
          <textarea
            cols="60"
            name="title"
            value={this.state.recipe.title}
            placeholder="Title"
            onChange={event => this.handleOnChangeForRecipeDetails(event)}
            /><br />
            <textarea
              cols="60"
              name="image_url"
              value={this.state.recipe.image_url}
              placeholder="Image"
              onChange={event => this.handleOnChangeForRecipeDetails(event)}
              /><br />
          <textarea
            cols="60"
            name="description"
            value={this.state.recipe.description}
            placeholder="Brief Description"
            onChange={event => this.handleOnChangeForRecipeDetails(event)}
          /><br />
          <EditIngredients
            handleOnChange={this.handleOnChangeForIngredients}
            updateIngredient={this.props.updateIngredient}
            deleteIngredient={this.props.deleteIngredient}
            ingredients={this.state.recipe.ingredients}
            recipeID={this.state.recipe.id}
          />
          { (this.state.toggleAddIngredients) ?
              this.renderAddIngredientsForm()
              : <input type="button" value="Add Ingredients" onClick={this.setState({toggleAddIngredients:true})}/>
          }
          <input type="submit" value="Update Recipe"/>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: actions.fetchIngredients,
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}

export default withRouter(connect(null, mapDispatchToProps)(EditRecipe))
