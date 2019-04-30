import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../actions/UserActions'
import BriefRecipeCard from './BriefRecipeCard'
import Auth from '../modules/Auth'

class RecipeList extends Component {
  constructor() {
    super()
    this.state = {
      recipes: null,
      recipesLoaded: false
    }
  }

  componentDidMount() {
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {

        this.setState({
          recipes: resJSON,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
  }

  render() {
    console.log(Auth.isUserAuthenticated())
    return (
      <>
        { (this.state.recipesLoaded)
          ? this.state.recipes.map( recipe =>
            <div className="recipe-card">
              <BriefRecipeCard recipe={recipe} key={recipe.food_name} />
            </div>
            )
          : <p>Loading...</p>
        }
      </>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserData: bindActionCreators(actions.fetchUserData, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.user.recipes
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeList))
