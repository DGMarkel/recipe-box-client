import React, { Component } from 'react'
import IngredientsTable from './IngredientsTable'

export default class RecipePreview extends Component {
  render() {
    return (
      <div className="preview">
        { (this.props.recipe.title)
          ? <>
              <h3 className="title">{this.props.recipe.title}</h3>
              <h5>Total Calories: {this.props.newRecipe ? <>Data Unavailable</> : this.props.sumNutritionalDataFor(this.props.recipe.ingredients, "calories")}</h5>
              <p>{this.props.recipe.description}</p>
              <div className="preview-image" style={{background: `url(${this.props.recipe.image_url})`, backgroundSize: '100%'}}>
              </div>
            </>
          : <h1>Preview</h1>
        }

        { (this.props.recipe.ingredients)
            ? <IngredientsTable recipe={this.props.recipe} />
            : <></>
        }
        { (this.props.newRecipe && this.props.recipe.title)
          ? <input type="submit" value="Save Recipe" onClick={e=>this.props.saveRecipe(e, this.props.recipe)} />
          : <></>
        }
      </div>
    )
  }
}
