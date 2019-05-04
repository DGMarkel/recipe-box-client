import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    id: null,
    username: '',
    email: '',
    recipes: [],
    auth: Auth.isUserAuthenticated(),
    isLoaded: false
    },
  newIngredients: [],
  sumNutritionalDataFor: (array, dataPoint) => Math.round(array.map(i => i[dataPoint]).reduce((a,b)=>a+b,0)),
  formatRecipeURL:  recipe => { return recipe.toLowerCase().replace(/\s/g , "-" ) }
}, action) {

  switch(action.type) {

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

      //do I really need this case below?

      case 'LOAD_USER_DATA':
        if (state.user.isLoaded) {
          return {
            ...state,
              user: {
                ...state.user,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                name: action.payload.name,
                recipes: action.payload.recipes || []
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

      case 'ADD_NEW_INGREDIENTS_TO_RECIPE':
        return {
          ...state,
          newIngredients: action.payload
        }

      case 'CLEAR_NEW_INGREDIENTS':
        return {
          ...state,
          newIngredients: []
        }

    default:
      return state
  }
}
