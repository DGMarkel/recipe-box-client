import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../actions/UserActions'

import BriefRecipeCard from './BriefRecipeCard'

class UserRecipesList extends Component {

  renderBriefRecipeCards = () => {
    return (
      this.props.recipes.map(recipe =>
        <div className="recipe-card">
          <BriefRecipeCard recipe={recipe} user_recipe={true} key={recipe.food_name} />
        </div>
      )
    )
  }

  componentDidMount() {
    this.props.fetchUserData();
  }

  render() {
    return (
      <div>
        { (this.props.recipes.length !== 0)
            ? this.renderBriefRecipeCards()
            : <h2>You haven't added any recipes yet</h2>
        }
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRecipesList))
