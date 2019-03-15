import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    username: '',
    email: '',
    name: '',
    monsters: {
      list: null,
    },
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

      case 'LOAD_USER_DATA':
        if (action.payload) {
          return {
              user: {
                username: action.payload.username,
                email: action.payload.email,
                name: action.payload.name,
                monsters: {
                  list: action.payload.monsters
                }
              }
          }
        }else {
          console.log("Still Loading")
        }




    default:
      return state
  }
}
