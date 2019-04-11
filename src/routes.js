import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import Auth from './modules/Auth'

import Login from './components/LoginForm'
import SignUp from './components/SignUpForm'
import Dashboard from './components/Dashboard'
import Recipes from './components/RecipeList'

export default (
  <BrowserRouter>
    <Switch id='routes'>
      <Route exact path='/' render={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      <Route path='/signup' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <SignUp/> }/>
      <Route path='/login' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <Login/> }/>
      <Route path='/logout' component={ () => Auth.isUserAuthenticated() ? Auth.deauthenticateToken() : <Redirect to="/"/> }/>
      <Route path='/dash' component={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      <Route path='/recipes' component={ () =>  <Recipes/> }/>
    </Switch>
  </BrowserRouter>
)
