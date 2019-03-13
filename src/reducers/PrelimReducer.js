import Auth from '../modules/Auth'
import React from 'react'

export default function prelimReducer(state={
  user: {
    username: '',
    password: '',
    email: '',
    name: '',
    auth: Auth.isUserAuthenticated(),
    monsters: {
      list: null,
      listLoaded: false
    },
  },
  monster: {
    name: '',
    description: ''
  }
}, action) {

  switch(action.type) {

    case 'LOADING_MONSTERS':
      return <p>Loading...</p>

    case 'LOADED_MONSTERS':
      return {
        ...state, monsters: {
          list: action.payload.monsters,
          listLoaded: true
        }
      }

    default:
      return state
  }
}
