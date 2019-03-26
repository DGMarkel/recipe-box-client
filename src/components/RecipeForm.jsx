import React, { Component } from 'react'
import './RecipeForm.css'
import RecipeContainer from '../containers/RecipeContainer'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      id: props.recipes.length,
      ingredients: ''
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

    const newRecipe = this.props.recipes.find(recipe => recipe.id === this.state.id)

    return (
      <div>
        <div className="search-form">
          <h1>Create a New Recipe</h1>
          <form onSubmit={(e) => this.props.fetchIngredients(e, this.state.title, this.state.id, this.state.ingredients)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={event => this.handleOnChange(event)}
              /><br />
            <input
              type="textarea"
              name="ingredients"
              value={this.state.ingredients}
              placeholder="Ingredient"
              onChange={event => this.handleOnChange(event)}
              />
            <input type="submit" value="Add Ingredients" />
          </form>
        </div>
        <div className="recipe-container">
        { (newRecipe)
          ? <RecipeContainer />
          : <p>Waiting...</p>
        }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: bindActionCreators(actions.fetchIngredients, dispatch),
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearch)
