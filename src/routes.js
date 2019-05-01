import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './modules/Auth'

import Login from './components/LoginForm'
import SignUp from './components/SignUpForm'
import Dashboard from './containers/Dashboard'
import Recipes from './containers/Recipes'
import NewRecipe from './containers/NewRecipe'
import EditRecipe from './containers/EditRecipe'
import FullRecipeCard from './components/FullRecipeCard'
import GenericNotFound from './components/GenericNotFound'

export default (
    <Switch id='routes'>
      <Route exact path='/' render={ () => <Recipes/> }/>
      <Route exact path='/signup' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <SignUp/> }/>
      <Route exact path='/login' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/dash"/> : <Login/> }/>
      <Route exact path='/dash' component={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes' component={ () =>  <Recipes/> }/>
      <Route exact path='/my-recipes' component={ () =>  Auth.isUserAuthenticated() ? <Recipes user="true"/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/new' component={ () =>  Auth.isUserAuthenticated() ? <NewRecipe/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/:recipeName' component={ () => <FullRecipeCard/> }/>
      // will need to update edit route to only show to owner
      <Route exact path='/recipes/:recipeName/edit' component={ () => Auth.isUserAuthenticated() ? <EditRecipe/> : <Redirect to="/login"/> }/>
      <Route path='*' component={() => <GenericNotFound />} />
    </Switch>
)
