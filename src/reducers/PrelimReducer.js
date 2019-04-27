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
    },
  ingredientUpdated: false,
  newIngredients: []
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

      case 'TOGGLE_INGREDIENT_UPDATED':
        return {
          ...state,
          ingredientUpdated: (state.ingredientUpdated) ? false : true
        }

      case 'UPDATE_RECIPE':
        const index = state.user.recipes.findIndex(recipe => recipe.id === action.payload.id)
        //this needs to be rewritten
        state.user.recipes[index] = action.payload
        return {
          ...state,
            user: {
              ...state.user,
                recipes: state.user.recipes
            }
        }

      case 'UPDATE_RECIPE_INGREDIENT':
        let recipeIndex = state.user.recipes.findIndex(recipe => recipe.id === action.payload.recipeID)
        const ingredientIndex = state.user.recipes[recipeIndex].ingredients.findIndex(i => i.food_name === action.payload.updatedIngredient.food_name)
        // below written to get the ball rolling - will rewrite later
        state.user.recipes[recipeIndex][ingredientIndex] = action.payload.updatedIngredient

        return {
           ...state,
           user: {
             ...state.user,
             recipes: state.user.recipes
             }
           }

        case 'UPDATE_RECIPE_DETAILS':
          recipeIndex = state.user.recipes.findIndex(recipe => recipe.id === action.payload.id)
          //needs to be rewritten
          state.user.recipes[recipeIndex].title = action.payload.title
          state.user.recipes[recipeIndex].image_url = action.payload.image_url
          state.user.recipes[recipeIndex].description = action.payload.description

      // case 'DELETE_INGREDIENT':
      //   const recipeId = action.payload.recipeId
      //   const ingredientIndex = action.payload.ingredientIndex
      //   const recipe = state.user.recipes.find(recipe => recipe.id === recipeId)
      //   recipe.ingredients.splice(ingredientIndex, 1)
      //   state.user.recipes[recipeId] = recipe
      //
      //   return {
      //     ...state,
      //     user: {
      //       ...state.user,
      //       recipes: state.user.recipes
      //       }
      //     }

    default:
      return state
  }
}
