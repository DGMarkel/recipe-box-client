import Auth from '../modules/Auth'

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
  
}
