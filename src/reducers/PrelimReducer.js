import Auth from '../modules/Auth'

export default function prelimReducer(state={
  user: {
    id: null,
    username: '',
    email: '', // unnecessary?
    recipes: [], // unnecessary?
    auth: Auth.isUserAuthenticated(),
    isLoaded: false // unnecessary?
    },
  recipes: [],
  //collects ingredients added to an existing recipe
  newIngredients: [],
  // adds up total nutritional data for a given dataPoint (ie, calories) and array of ingredients
  sumNutritionalDataFor: (ingredients, dataPoint) => Math.round(ingredients.map(i => i[dataPoint]).reduce((a,b)=>a+b,0)),
  // replaces spaces with dashes in recipe titles
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
                email: action.payload.email,
                username: action.payload.username,
                recipes: action.payload.recipes || []
              }
          }
        }else {
          console.log("Still Loading")
        }

      case 'LOAD_RECIPES':
        return {
          ...state,
            recipes: action.payload
        }

      case 'ADD_RECIPE':
        return {
          ...state,
              recipes: [...state.recipes.concat(action.payload)]
        }

      case 'ADD_NEW_INGREDIENTS_TO_RECIPE':
        return {
          ...state,
          newIngredients: action.payload
        }

      case 'UPDATE_RECIPE_DETAILS':
        return {
          ...state,
            recipes: state.recipes.map(
              recipe => recipe.id === action.payload.id
                ? {...recipe, title: action.payload.title, description: action.payload.description, image_url: action.payload.image_url, servings: action.payload.servings, id: action.payload.id}
                : recipe
              )
        }

      case 'UPDATE_INGREDIENT':
        const recipeIndex = state.recipes.indexOf(state.recipes.find( recipe => recipe.id === action.payload.recipeID))
        state.recipes[recipeIndex].ingredients[action.payload.ingredientIndex] = action.payload.updatedIngredient

      case 'CLEAR_NEW_INGREDIENTS':
        return {
          ...state,
          newIngredients: []
        }

    default:
      return state
  }
}
