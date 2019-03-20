import React, { Component } from 'react'
import RecipeContainer from '../containers/RecipeContainer'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class RecipeSearch extends Component {

  constructor() {
    super();
    this.state = {
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
    return (
      <div className="search-form">
        <h1>Add a New Recipe</h1>
        <form onSubmit={(e) => this.props.fetchIngredients(e, this.state.ingredients)}>
          <input
            type="text"
            name="ingredients"
            value={this.state.ingredients}
            placeholder="Ingredient"
            onChange={event => this.handleOnChange(event)}
            />
          <input type="submit" value="Add Ingredients" />
        </form>
        { (this.state.recipeLoaded)
          ? <RecipeContainer />
          : <p>Recipe will go here</p>
         }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: bindActionCreators(actions.fetchIngredients, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RecipeSearch)
