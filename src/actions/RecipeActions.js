import Auth from '../modules/Auth'

export function fetchAndPostIngredients(event, recipeData) {
  event.preventDefault()

  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: recipeData.rawIngredients
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
    }
    }).then(res => res.json())
    .then(res => {
      const ingredientList = res.foods.map( ingredient => {
        let ingredientList = {}
        ingredientList["food_name"] = ingredient.food_name;
        ingredientList["serving_qty"] = ingredient.serving_qty;
        ingredientList["serving_unit"] = ingredient.serving_unit;
        ingredientList["calories"] = ingredient.nf_calories;
        ingredientList["total_fat"] = ingredient.nf_total_fat;
        ingredientList["saturated_fat"] = ingredient.nf_saturated_fat;
        ingredientList["cholesterol"] = ingredient.nf_cholesterol;
        ingredientList["sodium"] = ingredient.nf_sodium;
        ingredientList["total_carbohydrate"] = ingredient.nf_total_carbohydrate;
        ingredientList["dietary_fiber"] = ingredient.nf_dietary_fiber;
        ingredientList["sugars"] = ingredient.nf_sugars;
        ingredientList["protein"] = ingredient.nf_protein;
        ingredientList["potassium"] = ingredient.nf_potassium;
        return ingredientList
      })
      dispatch({ type:'ADD_NEW_INGREDIENTS_TO_RECIPE', payload: ingredientList })
      postIngredients(ingredientList, recipeData)
    }).catch(err => console.log(err));
  }
}

export function clearNewIngredient() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_NEW_INGREDIENTS' })
  }
}

function postIngredients(ingredientsList, recipeData) {
  fetch('/edit-recipe', {
    method: 'PATCH',
    body: JSON.stringify({
      recipe: {
        id: recipeData.recipe.id,
        title: recipeData.recipe.title,
        description: recipeData.recipe.description,
        image_url: recipeData.recipe.image_url,
        ingredients: ingredientsList
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      token: Auth.getToken(),
      'authorization':  `Token ${Auth.getToken()}`
    }
  })
}

export function toggleIngredientUpdated() {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_INGREDIENT_UPDATED'})
  }
}


export function updateRecipeDetails(event, recipe) {
  event.preventDefault();

  return(dispatch) => {
    fetch('/edit-recipe', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
    .then(res => {
      dispatch({ type: 'UPDATE_RECIPE_DETAILS', payload: res.recipe })
    })
    .catch(err => console.log(err))
  }
}

export function updateIngredient(event, recipeID, ingredient) {

  event.preventDefault();

  if (ingredient.food_name === ingredient.serving_unit) delete ingredient.serving_unit;
  const ingredientString = `${ingredient.serving_qty} ${ingredient.serving_unit || ''} ${ingredient.food_name}`

  return(dispatch) => {
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
      console.log(res)
      let updatedIngredient = {}
      updatedIngredient["food_name"] = res.foods[0].food_name;
      updatedIngredient["serving_qty"] = res.foods[0].serving_qty;
      updatedIngredient["serving_unit"] = res.foods[0].serving_unit;
      updatedIngredient["calories"] = res.foods[0].nf_calories;
      updatedIngredient["total_fat"] = res.foods[0].nf_total_fat;
      updatedIngredient["saturated_fat"] = res.foods[0].nf_saturated_fat;
      updatedIngredient["cholesterol"] = res.foods[0].nf_cholesterol;
      updatedIngredient["sodium"] = res.foods[0].nf_sodium;
      updatedIngredient["total_carbohydrate"] = res.foods[0].nf_total_carbohydrate;
      updatedIngredient["dietary_fiber"] = res.foods[0].nf_dietary_fiber;
      updatedIngredient["sugars"] = res.foods[0].nf_sugars;
      updatedIngredient["protein"] = res.foods[0].nf_protein;
      updatedIngredient["potassium"] = res.foods[0].nf_potassium;

      dispatch({ type:'UPDATE_INGREDIENT', payload: { updatedIngredient: updatedIngredient, ingredientID: ingredient.id } })

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
    }).then(dispatch({ type: 'TOGGLE_INGREDIENT_UPDATED'})).catch(err => console.log(err));
  }
}

export function clearUpdatedIngredient() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_UPDATED_INGREDIENT'})
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
    })
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
          ingredients: recipe.ingredients
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then(res => res.json())
    .then(res => {
      dispatch({ type: 'ADD_RECIPE', payload: res.recipe})
    })
    .catch(err => console.log(err))
  }
}
