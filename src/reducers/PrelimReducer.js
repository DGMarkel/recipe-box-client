import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    id: null,
    username: '',
    email: '',
    name: '',
    monsters: [],
    recipes: [],
    auth: Auth.isUserAuthenticated(),
    isLoaded: false
  },
  recipeAdded: false
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
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                name: action.payload.user.name,
                monsters: action.payload.monsters
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
              monsters: [...state.user.monsters.concat(action.payload)]
            }
          }

      case 'ADD_RECIPE':
        console.log(action.payload)
        return {
          ...state,
            user: {
              ...state.user,
              recipes: [...state.user.recipes.concat(action.payload)]
            }
        }

      case 'DELETE_INGREDIENT':
        const recipeId = action.payload.recipeId
        const ingredientIndex = action.payload.ingredientIndex
        const recipe = state.user.recipes[recipeId]
        recipe.ingredients.splice(ingredientIndex, 1)
        state.user.recipes[recipeId] = recipe

        return {
          ...state,
          user: {
            ...state.user,
            recipes: [recipe]
            }
          }



    default:
      return state
  }
}
