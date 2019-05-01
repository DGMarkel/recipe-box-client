import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import BriefRecipeCard from '../components/BriefRecipeCard'
import Auth from '../modules/Auth'

class RecipeList extends Component {
  constructor() {
    super()
    this.state = {
      recipes: null,
      recipesLoaded: false,
      search_term: ''
    }
  }

  componentDidMount() {
    this.props.user ? this.userRecipes() : this.allRecipes()
  }

  userRecipes = () => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then( res => res.json())
    .then( res => {
      this.setState({
        recipes: res.recipes,
        recipesLoaded: true
      })
    })
  }

  allRecipes = () => {
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {

        this.setState({
          recipes: resJSON,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
  }

  searchAllRecipes = (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      ingredient: {
        search_term: this.state.search_term
      }
    })
    fetch('/search-by-ingredient', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: payload
    }).then(res=>res.json())
    .then(res=>{
      console.log(res)
      this.setState({
        ...this.state,
          recipes: res
      })
    })

    }


  renderSearch = () => {
    return (
      <form onSubmit={e=>this.searchAllRecipes(e)}>
        <input type="text" onChange={e => {this.setState({ search_term: e.target.value })}} />
      </form>
    )
  }

  render() {
    return (
      <>
        { this.props.user ? <></> : this.renderSearch() }
        { (this.state.recipesLoaded)
          ?
            this.state.recipes.map( recipe =>
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
export default withRouter(RecipeList)
