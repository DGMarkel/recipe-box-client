import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './modules/Auth'

import Recipes from './containers/Recipes'
import NewRecipe from './containers/NewRecipe'
import Recipe from './containers/Recipe'
import GenericNotFound from './components/Misc/GenericNotFound'

export default (
    <Switch id='routes'>
      <Route exact path='/' render={ () => <Recipes/> }/>
      {/* below route is unused...keeping because I'll prob use it eventually */}
      <Route exact path='/recipes' component={ () =>  <Recipes/> }/>
      <Route exact path='/my-recipes' component={ () =>  Auth.isUserAuthenticated() ? <Recipes user="true"/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/new' component={ () =>  Auth.isUserAuthenticated() ? <NewRecipe/> : <Redirect to="/login"/> }/>
      <Route exact path='/recipes/:recipeName' component={ () => <Recipe/> }/>
      <Route path='*' component={() => <GenericNotFound />} />
    </Switch>
)
