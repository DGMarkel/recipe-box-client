import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'
import EditIngredients from '../components/EditIngredients'
import AddIngredientsForm from '../components/AddIngredientsForm'

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

  deleteIngredientLocally = ingredientIndex => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        ingredients: this.state.recipe.ingredients.filter((ingredient) => ingredient !== this.state.recipe.ingredients[ingredientIndex] )
      }
    })
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  componentDidUpdate() {
    if (this.props.newIngredients.length > 0) {
      this.setState({
        ...this.state,
        recipe: {
          ...this.state.recipe,
          ingredients: this.state.recipe.ingredients.concat(this.props.newIngredients)
        }
      })
      this.props.clearNewIngredient()
    }
  }

  updateIngredientLocally = () => {
    if (Object.entries(this.props.updatedIngredient.ingredient).length > 0 && this.props.updatedIngredient.constructor === Object) {
      this.setState({
        ...this.state,
        recipe: {
          ...this.state.recipe,
          ingredients: this.state.ingredients.map((ingredient, index) => index === this.props.updatedIngredient.ingredientIndex ? this.props.updatedIngredient.ingredient : ingredient )
        }
      })
    }
  }

  fetchRecipe = () => {
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
        },
      })
    })
  }

  toggleAddIngredientsForm = () => {
    this.setState({
      toggleAddIngredients: (this.state.toggleAddIngredients) ? false : true
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

  render() {
    return (
      <>
        <form>
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
            updateIngredientLocally={this.updateIngredientLocally}
            deleteIngredientLocally={this.deleteIngredientLocally}
            deleteIngredient={this.props.deleteIngredient}
            fetchRecipe={this.fetchRecipe}
            ingredients={this.state.recipe.ingredients}
            recipeID={this.state.recipe.id}
          />
          { (this.state.toggleAddIngredients)
              ? <div className="add-ingredients-form">
                  <AddIngredientsForm
                    fetchAndPostIngredients={this.props.fetchAndPostIngredients}
                    handleOnChange={this.handleOnChange}
                    state={this.state}
                  />
                  <input type="button" value="Close" onClick={this.toggleAddIngredientsForm} />
                </div>
              : <input type="button" value="Add Ingredients" onClick={this.toggleAddIngredientsForm} />
          }
        </form>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    newIngredients: state.newIngredients,
    updatedIngredient: state.updatedIngredient
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearNewIngredient: bindActionCreators(actions.clearNewIngredient, dispatch),
    clearUpdatedIngredient: bindActionCreators(actions.clearUpdatedIngredient, dispatch),
    fetchAndPostIngredients: bindActionCreators(actions.fetchAndPostIngredients, dispatch),
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    updateIngredient: bindActionCreators(actions.updateIngredient, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
