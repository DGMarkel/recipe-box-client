import React, { Component } from 'react'

class NewRecipeForm extends Component {

  render() {
    return (
      <div>
        <div className="recipe-form">
          <h1>Create a New Recipe</h1>
          <form>
            <textarea
              cols="60"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={event => this.props.handleOnChange(event)}
              /><br />
              <textarea
                cols="60"
                name="image_url"
                value={this.state.image_url}
                placeholder="Image"
                onChange={event => this.props.handleOnChange(event)}
                /><br />
            <textarea
              cols="60"
              name="description"
              value={this.state.description}
              placeholder="Brief Description"
              onChange={event => this.props.handleOnChange(event)}
            /><br />
            <textarea
              rows="10"
              cols="60"
              name="ingredients"
              value={this.state.ingredients}
              placeholder="Ingredient"
              onChange={event => this.props.handleOnChangeForIngredients(event)}
              /><br />
            <input type="submit" value="Add Ingredients" />
          </form>
        </div>
      </div>
    )
  }
}

export default NewRecipeForm
