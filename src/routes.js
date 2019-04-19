import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './modules/Auth'

import Login from './components/LoginForm'
import SignUp from './components/SignUpForm'
import Dashboard from './containers/Dashboard'
import Recipes from './components/RecipeList'
import UserRecipes from './components/UserRecipesList'
import NewRecipeForm from './containers/NewRecipeForm'
import EditRecipe from './containers/EditRecipe'
import FullRecipeCard from './components/FullRecipeCard'

export default (
    <Switch id='routes'>
      <Route exact path='/' render={ () => <Recipes/> }/>
      <Route path='/signup' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <SignUp/> }/>
      <Route path='/login' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <Login/> }/>
      <Route path='/dash' component={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes' component={ () =>  <Recipes/> }/>
      <Route path='/my-recipes' component={ () =>  Auth.isUserAuthenticated() ? <UserRecipes/> : <Redirect to="/login"/> }/>
      <Route path='/recipes/new' component={ () =>  Auth.isUserAuthenticated() ? <NewRecipeForm/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/:recipeName' component={ () => <FullRecipeCard/> }/>
      <Route exact path='/recipes/:recipeName/edit' component={ () => <EditRecipe/> }/>

    </Switch>
)
