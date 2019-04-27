import React, { Component } from 'react'
import IngredientsTable from './IngredientsTable'

export default class RecipePreview extends Component {
  render() {
    return (
      <div>
        <h3 className="title">{this.props.recipe.title}</h3>
        <img src={this.props.recipe.image_url} />
        <p>{this.props.recipe.description}</p>
        { (this.props.recipe.ingredients)
            ? <IngredientsTable recipe={this.props.recipe} />
            : <></>
        }
        { (this.props.newRecipe && this.props.recipe.title)
          ? <input type="submit" value="Save Recipe" onSubmit={e=>this.props.saveRecipe(e, this.props.recipe)} />
          : <></>
        }
      </div>
    )
  }
}
