import React, { Component } from 'react'
import RecipeContainer from '../containers/RecipeContainer'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      id: props.recipes.length + 1 || null,
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
      <div className="search-form">
        <h1>Add a New Recipe</h1>
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
        { (newRecipe)
          ? <RecipeContainer recipe={newRecipe} />
          : <p>Waiting...</p>
        }

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: bindActionCreators(actions.fetchIngredients, dispatch),
    deleteIngredient: bindActionCreators(actions.deleteIngredient, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearch)
