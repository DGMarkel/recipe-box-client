import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    username: '',
    email: '',
    name: '',
    monsters: {
      list: null,
    },
    auth: Auth.isUserAuthenticated(),
    isLoaded: false
  }
}, action) {

  switch(action.type) {

      case 'REGISTER_USER':
        return {
          ...state,
            user: {
              ...state.user,
              auth: Auth.isUserAuthenticated()
            }
        }

      case 'LOGOUT_USER':
        return {
            user: {
              ...state.user,
              auth: Auth.isUserAuthenticated()
            }
        }

      case 'LOADING_USER_DATA':
        return {
          ...state,
            user: {
              ...state.user,
              isLoaded: true,
              auth: true
            }
        }

      case 'LOAD_USER_DATA':
        if (state.user.isLoaded) {
          return {
            ...state,
              user: {
                ...state.user,
                username: action.payload.user.username,
                email: action.payload.user.email,
                name: action.payload.user.name,
                monsters: {
                  list: action.payload.monsters
                }
              }
          }
        }else {
          console.log("Still Loading")
        }

      case 'ADD_USER_MONSTER':
        return {
          ...state,
            user: {
              ...state.user,
                monsters: {
                  ...state.user.monsters,
                  list:
                    action.payload
                  }
                }
              }



    default:
      return state
  }
}
