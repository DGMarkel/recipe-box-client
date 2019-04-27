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
