import Auth from '../modules/Auth'

export function loadRecipes() {
  return (dispatch) => {
  fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/recipes')
    .then(res => res.json())
    .then(resJSON => {
      dispatch({type:'LOAD_RECIPES', payload: resJSON})
    })
    .catch(err => console.log(err))
  }
}

export function handleOnChangeForIngredients(e, ingredientIndex, recipeID) {
  return (dispatch) => {
    dispatch({
      type: 'HANDLE_ONCHANGE_FOR_INGREDIENTS',
      payload: {
        name: e.target.name,
        value: e.target.value,
        ingredientIndex: ingredientIndex,
        recipeID: recipeID
      }
    })
  }
}

export function handleOnChangeForRecipeDetails(event, recipeID) {
  event.preventDefault();
  const name = event.target.name;
  const value = event.target.value;
  return (dispatch) => {
    dispatch({
      type: 'HANDLE_ONCHANGE_FOR_RECIPE_DETAILS',
      payload: { name: name, value: value, recipeID: recipeID }
    })
  }
}

// updates recipe title, description, and image_url on backend
export function updateRecipeDetails(event, recipe) {
  event.preventDefault();
  return (dispatch) => {
    fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/edit-recipe', {
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

export function updateIngredient(event, recipeID, foodName, ingredient, ingredientIndex) {
  event.preventDefault();
  if (foodName === ingredient.serving_unit) delete ingredient.serving_unit;
  const ingredientString = `${ingredient.serving_qty} ${ingredient.serving_unit || ''} ${foodName}`

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

        fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/edit-ingredient', {
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
        return {
          food_name: ingredient.food_name,
          serving_qty: ingredient.serving_qty,
          serving_unit: ingredient.serving_unit,
          calories: ingredient.nf_calories,
          total_fat: ingredient.nf_total_fat,
          saturated_fat: ingredient.nf_saturated_fat,
          cholesterol: ingredient.nf_cholesterol,
          sodium: ingredient.nf_sodium,
          total_carbohydrate: ingredient.nf_total_carbohydrate,
          dietary_fiber: ingredient.nf_dietary_fiber,
          sugars: ingredient.nf_sugars,
          protein: ingredient.nf_protein,
          potassium: ingredient.nf_potassium,
        }
      })

      fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/edit-recipe', {
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
    fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/delete', {
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
    fetch('https://cors-anywhere.herokuapp.com/https://my-recipe-box-project.herokuapp.com/recipes', {
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
