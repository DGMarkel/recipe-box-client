import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import Auth from './modules/Auth'

import Login from './components/LoginForm'
import SignUp from './components/SignUpForm'
import Dashboard from './components/Dashboard'

export default (
  <BrowserRouter>
    <Switch id='routes'>
      <Route exact path='/' render={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
      <Route path='/signup' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <SignUp/> }/>
      <Route path='/login' component={ () => Auth.isUserAuthenticated() ? <Redirect to="/"/> : <Login/> }/>
      <Route path='/logout' component={ () => Auth.deauthenticateToken() }/>
      <Route path='/dash' component={ () =>  Auth.isUserAuthenticated() ? <Dashboard/> : <Redirect to="/login"/> }/>
    </Switch>
  </BrowserRouter>
)
