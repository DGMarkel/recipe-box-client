import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './modules/Auth'

import Dashboard from './containers/Dashboard'
import Recipes from './containers/Recipes'
import NewRecipe from './containers/NewRecipe'
import EditRecipe from './containers/EditRecipe'
import FullRecipeCard from './components/FullRecipeCard'
import GenericNotFound from './components/GenericNotFound'

export default (
    <Switch id='routes'>
      <Route exact path='/' render={ () => <Recipes/> }/>
      {/*below route is underutilized */} 
      <Route exact path='/dash' component={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      {/* below route is unused...keeping because I'll prob use it eventually */}
      <Route exact path='/recipes' component={ () =>  <Recipes/> }/>
      <Route exact path='/my-recipes' component={ () =>  Auth.isUserAuthenticated() ? <Recipes user="true"/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/new' component={ () =>  Auth.isUserAuthenticated() ? <NewRecipe/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/:recipeName' component={ () => <FullRecipeCard/> }/>
      <Route exact path='/recipes/:recipeName/edit' component={ () => Auth.isUserAuthenticated() ? <EditRecipe/> : <Redirect to="/login"/> }/>
      <Route path='*' component={() => <GenericNotFound />} />
    </Switch>
)
