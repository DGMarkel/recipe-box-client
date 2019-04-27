import React, { Component } from 'react'

class NewRecipeForm extends Component {

  render() {
    return (
      <div>
          <h1>Create a New Recipe</h1>
          <form>
            <textarea
              cols="60"
              name="title"
              value={this.props.recipe.title}
              placeholder="Title"
              onChange={event => this.props.handleOnChange(event)}
              /><br />
              <textarea
                cols="60"
                name="image_url"
                value={this.props.recipe.image_url}
                placeholder="Image"
                onChange={event => this.props.handleOnChange(event)}
                /><br />
            <textarea
              cols="60"
              name="description"
              value={this.props.recipe.description}
              placeholder="Brief Description"
              onChange={event => this.props.handleOnChange(event)}
            /><br />
            <textarea
              rows="10"
              cols="60"
              name="ingredients"
              value={this.props.recipe.ingredients}
              placeholder="Ingredient"
              onChange={event => this.props.handleOnChangeForIngredients(event)}
              /><br />
            <input type="submit" value="Add Ingredients" onSubmit={e=>this.props.fetchIngredients} />
          </form>
      </div>
    )
  }
}

export default NewRecipeForm
