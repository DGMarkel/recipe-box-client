import React, { Component } from 'react'
import IngredientsTable from './IngredientsTable'

export default class RecipePreview extends Component {
  render() {
    return (
      <div className="new-recipe">
        <div className="recipe-header">
          <h3 className="title">{this.props.recipe.title}</h3>
        </div>
        <img src={this.props.recipe.image_url} />
        <p>{this.props.recipe.description}</p>
        { (this.props.recipe.ingredients)
            ? <IngredientsTable recipe={this.props.recipe} />
            : <></>
        }
      </div>
    )
  }
}
