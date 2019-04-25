import React, { Component } from 'react'
import './NewRecipeForm.css'
import NewRecipeContainer from './NewRecipeContainer'
import * as actions from '../actions/RecipeActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class NewRecipeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image_url: '',
      description: '',
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
      <div>
        <div className="recipe-form">
          <h1>Create a New Recipe</h1>
          <form onSubmit={(e) => this.props.fetchIngredients(e, this.state.title, this.state.image_url, this.state.id, this.state.ingredients, this.state.description)}>
            <textarea
              cols="60"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={event => this.handleOnChange(event)}
              /><br />
              <textarea
                cols="60"
                name="image_url"
                value={this.state.image_url}
                placeholder="Image"
                onChange={event => this.handleOnChange(event)}
                /><br />
            <textarea
              cols="60"
              name="description"
              value={this.state.description}
              placeholder="Brief Description"
              onChange={event => this.handleOnChange(event)}
            /><br />
            <textarea
              rows="10"
              cols="60"
              name="ingredients"
              value={this.state.ingredients}
              placeholder="Ingredient"
              onChange={event => this.handleOnChange(event)}
              /><br />
            <input type="submit" value="Add Ingredients" />
          </form>
        </div>
        <div className="recipe-container">
        { <NewRecipeContainer recipe={this.state} /> }
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
    recipes: state.user.recipes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipeForm)
