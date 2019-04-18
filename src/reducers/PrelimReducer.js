import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    id: null,
    username: '',
    email: '',
    name: '',
    recipes: [],
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
      console.log(action.payload)
        if (state.user.isLoaded) {
          return {
            ...state,
              user: {
                ...state.user,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                name: action.payload.name,
                recipes: action.payload.recipes
              }
          }
        }else {
          console.log("Still Loading")
        }

      case 'ADD_RECIPE':
        return {
          ...state,
            user: {
              ...state.user,
              recipes: [...state.user.recipes.concat(action.payload)]
            }
        }

      case 'UPDATE_RECIPE':
        const index = state.user.recipes.findIndex(recipe => recipe.id === action.payload.id)
        state.user.recipes[index] = action.payload
        return {
          ...state,
            user: {
              ...state.user,
                recipes: state.user.recipes
            }
        }

      case 'DELETE_INGREDIENT':
        const recipeId = action.payload.recipeId
        const ingredientIndex = action.payload.ingredientIndex
        const recipe = state.user.recipes.find(recipe => recipe.id === recipeId)
        recipe.ingredients.splice(ingredientIndex, 1)
        state.user.recipes[recipeId] = recipe

        return {
          ...state,
          user: {
            ...state.user,
            recipes: state.user.recipes
            }
          }

    default:
      return state
  }
}
