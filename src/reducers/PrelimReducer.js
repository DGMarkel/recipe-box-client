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

  switch(action.type) {

    case 'LOADING_MONSTERS':
      return state

    case 'LOADED_MONSTERS':
      return {
        ...state,
            user: {
              ...state.user,
              monsters: {
                list: action.payload.monsters,
                listLoaded: true
              }
        }
      }

      case 'LOADING_USER_DATA':
        console.log('Loading')

      case 'LOAD_USER_DATA':
        console.log(action.payload)


    default:
      return state
  }
}
