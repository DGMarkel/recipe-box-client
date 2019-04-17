import Auth from '../modules/Auth'

export function fetchIngredient(event, ingredient, id) {
  event.preventDefault();
  return(dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: ingredient
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

    dispatch({
      type: 'ADD_INGREDIENT_TO_RECIPE',
      payload: {
        id: id,
        ingredients: ingredientList,
      }
    })
  }).catch(err => console.log(err));
  }
}


export function fetchIngredients(event, title, image_url, id, ingredients, description) {
  event.preventDefault()
  return (dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: ingredients
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

      dispatch({
        type: 'ADD_RECIPE',
        payload: {
          title: title,
          image_url: image_url,
          id: id,
          ingredients: ingredientList,
          description: description
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

export function saveRecipe(e, recipe) {
  console.log(recipe)
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
    }).catch(err => console.log(err))
  }
}
