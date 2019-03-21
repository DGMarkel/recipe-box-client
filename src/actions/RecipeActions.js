import Auth from '../modules/Auth'

export function fetchIngredients(event, title, id, data) {
  event.preventDefault()
  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: data
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
    }
    }).then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch({
        type: 'ADD_RECIPE',
        payload: {
          title: title,
          id: id,
          ingredients: res.foods
        }
      })
    }).catch(err => console.log(err));
  }
}

export function deleteIngredient(e, recipeId, ingredientIndex) {
  e.preventDefault();
  return (dispatch) => {
    dispatch({
      type: 'DELETE_INGREDIENT',
      payload: {
        recipeId: recipeId,
        ingredientIndex: ingredientIndex
      }
    })
  }
}

export function saveRecipe(e, ingredients) {
  e.preventDefault();
  console.log(ingredients)
  return (dispatch) => {
    fetch('/recipes', {
      method: 'POST',
      body: JSON.stringify({
        recipe: ingredients,
      }),
      headers: {
        'Content-Type': 'app/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).catch(err => console.log(err))
  }
}
