import Auth from '../modules/Auth'

export function loadRecipes() {
  return (dispatch) => {
  fetch('/recipes')
    .then(res => res.json())
    .then(resJSON => {
      dispatch({type:'LOAD_RECIPES', payload: resJSON})
    })
    .catch(err => console.log(err))
  }
}

// updates recipe title, description, and image_url on backend
export function updateRecipeDetails(event, recipe) {
  event.preventDefault();
  return (dispatch) => {
    fetch('/edit-recipe', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          servings: recipe.servings
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(dispatch({type: 'UPDATE_RECIPE_DETAILS', payload: recipe}))
    .catch(err => console.log(err))
  }
}

// fetches new data for edited ingredients from 3rd party API;
// updates local state with new ingredient data;
// updates backend ingredients

export function updateIngredient(event, recipeID, foodName, servingData, ingredientIndex) {
  event.preventDefault();
  if (foodName === servingData.serving_unit) delete servingData.serving_unit;
  const ingredientString = `${servingData.serving_qty} ${servingData.serving_unit || ''} ${foodName}`

  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      body: JSON.stringify({
        query: ingredientString
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
      }
      }).then(res => res.json())
      .then(res => {
        let updatedIngredient = {
          food_name: res.foods[0].food_name,
          serving_qty: res.foods[0].serving_qty,
          serving_unit: res.foods[0].serving_unit,
          calories: res.foods[0].nf_calories,
          total_fat: res.foods[0].nf_total_fat,
          saturated_fat: res.foods[0].nf_saturated_fat,
          cholesterol: res.foods[0].nf_cholesterol,
          sodium: res.foods[0].nf_sodium,
          total_carbohydrate: res.foods[0].nf_total_carbohydrate,
          dietary_fiber: res.foods[0].nf_dietary_fiber,
          sugars: res.foods[0].nf_sugars,
          protein: res.foods[0].nf_protein,
          potassium: res.foods[0].nf_potassium,
        }

        fetch('/edit-ingredient', {
          method: 'PATCH',
          body: JSON.stringify({
            ingredient: {
              ingredient_data: updatedIngredient,
              recipeID: recipeID
            }
          }),
          headers: {
            'Content-Type': 'application/json',
            token: Auth.getToken(),
            'authorization':  `Token ${Auth.getToken()}`
          }
        })

        dispatch({ type: 'UPDATE_INGREDIENT', payload: {recipeID: recipeID, ingredientIndex: ingredientIndex, updatedIngredient: updatedIngredient}})
        }).catch(err => console.log(err));
    }
  }




export function fetchAndPostIngredients(event, rawIngredients, recipe) {
  event.preventDefault()
  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: rawIngredients
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
    }
    }).then(res => res.json())
    .then(res => {
      const ingredientsList = res.foods.map( ingredient => {
        let newIngredient = {
          food_name: res.foods[0].food_name,
          serving_qty: res.foods[0].serving_qty,
          serving_unit: res.foods[0].serving_unit,
          calories: res.foods[0].nf_calories,
          total_fat: res.foods[0].nf_total_fat,
          saturated_fat: res.foods[0].nf_saturated_fat,
          cholesterol: res.foods[0].nf_cholesterol,
          sodium: res.foods[0].nf_sodium,
          total_carbohydrate: res.foods[0].nf_total_carbohydrate,
          dietary_fiber: res.foods[0].nf_dietary_fiber,
          sugars: res.foods[0].nf_sugars,
          protein: res.foods[0].nf_protein,
          potassium: res.foods[0].nf_potassium,
        }
        return newIngredient
      })

      fetch('/edit-recipe', {
        method: 'PATCH',
        body: JSON.stringify({
          recipe: {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            image_url: recipe.image_url,
            ingredients: ingredientsList
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          token: Auth.getToken(),
          'authorization':  `Token ${Auth.getToken()}`
        }
      })
      dispatch({ type:'ADD_NEW_INGREDIENTS_TO_RECIPE', payload: {ingredientsList: ingredientsList, recipeID: recipe.id} })
    }).catch(err => console.log(err));
  }
}

export function clearNewIngredient() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_NEW_INGREDIENTS' })
  }
}

export function deleteIngredient(e, recipeId, ingredient) {
  e.preventDefault();
  return (dispatch) => {
    fetch('/delete', {
      method: 'DELETE',
      body: JSON.stringify({
        ingredient: {
          recipeID: recipeId,
          ingredient_data: ingredient
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(dispatch({type: 'DELETE_INGREDIENT', payload: {recipeId: recipeId, ingredient: ingredient}}))
  }
}

export function saveRecipe(e, recipe) {
  e.preventDefault();
  return (dispatch) => {
    fetch('/recipes', {
      method: 'POST',
      body: JSON.stringify({
        recipe: {
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          ingredients: recipe.ingredients,
          servings: recipe.servings
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
    .then(res => {
      recipe.id = res.recipe.id
      dispatch({ type: 'ADD_RECIPE', payload: recipe})
    })
    .catch(err => console.log(err))
  }
}
