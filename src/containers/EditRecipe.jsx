import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/RecipeActions'

import './EditRecipe.css'

import EditIngredients from '../components/EditIngredients'
import AddIngredientsForm from '../components/AddIngredientsForm'
import NewRecipeContainer from './NewRecipeContainer'

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

updateIngredient = (event, recipeID, ingredient, ingredientIndex) => {

    event.preventDefault();

    if (ingredient.food_name === ingredient.serving_unit) delete ingredient.serving_unit;
    const ingredientString = `${ingredient.serving_qty} ${ingredient.serving_unit || ''} ${ingredient.food_name}`

      fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      body: JSON.stringify({
        query: ingredientString
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
      }
    }).then(res => res.json())
    .then(res => {
        let updatedIngredient = {}
        updatedIngredient["food_name"] = res.foods[0].food_name;
        updatedIngredient["serving_qty"] = res.foods[0].serving_qty;
        updatedIngredient["serving_unit"] = res.foods[0].serving_unit;
        updatedIngredient["calories"] = res.foods[0].nf_calories;
        updatedIngredient["total_fat"] = res.foods[0].nf_total_fat;
        updatedIngredient["saturated_fat"] = res.foods[0].nf_saturated_fat;
        updatedIngredient["cholesterol"] = res.foods[0].nf_cholesterol;
        updatedIngredient["sodium"] = res.foods[0].nf_sodium;
        updatedIngredient["total_carbohydrate"] = res.foods[0].nf_total_carbohydrate;
        updatedIngredient["dietary_fiber"] = res.foods[0].nf_dietary_fiber;
        updatedIngredient["sugars"] = res.foods[0].nf_sugars;
        updatedIngredient["protein"] = res.foods[0].nf_protein;
        updatedIngredient["potassium"] = res.foods[0].nf_potassium;

        this.setState({
          ...this.state,
            recipe: {
              ...this.state.recipe,
              ingredients: this.state.recipe.ingredients.map((ingredient, index) => index === ingredientIndex ? updatedIngredient : ingredient)
            }
        })

        fetch('/edit-ingredient', {
          method: 'PATCH',
          body: JSON.stringify({
              ingredient: {
                ingredient_data: updatedIngredient,
                recipeID: recipeID
              }
            }),
          headers: {
            'Content-Type': 'application/json',
            token: Auth.getToken(),
            'authorization':  `Token ${Auth.getToken()}`
          }
        })
      }).catch(err => console.log(err));
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
        <div className="edit-recipe-form">
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
              updateIngredient={this.updateIngredient}
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
        </div>
        <div className="recipe-preview">
          <NewRecipeContainer recipe={this.state.recipe} />
        </div>
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
    fetchAndPostIngredients: bindActionCreators(actions.fetchAndPostIngredients, dispatch),
    updateRecipeDetails: bindActionCreators(actions.updateRecipeDetails, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe))
