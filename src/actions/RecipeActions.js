import Auth from '../modules/Auth'

export function updateIngredient(event, recipe) {
  event.preventDefault();
  let ingredientsList = ''
  recipe.ingredients.map( ingredient => { if (ingredient.food_name === ingredient.serving_unit) delete ingredient.serving_unit })
  recipe.ingredients.map(ingredient => ingredientsList += (`${ingredient.serving_qty} ${ingredient.serving_unit || ''} ${ingredient.food_name} `))
  return(dispatch) => {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    body: JSON.stringify({
      query: ingredientsList
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
    }
  }).then(res => res.json())
  .then(res => {
    const updatedIngredientList = res.foods.map( ingredient => {
      let updatedIngredientList = {}
      updatedIngredientList["food_name"] = ingredient.food_name;
      updatedIngredientList["serving_qty"] = ingredient.serving_qty;
      updatedIngredientList["serving_unit"] = ingredient.serving_unit;
      updatedIngredientList["calories"] = ingredient.nf_calories;
      updatedIngredientList["total_fat"] = ingredient.nf_total_fat;
      updatedIngredientList["saturated_fat"] = ingredient.nf_saturated_fat;
      updatedIngredientList["cholesterol"] = ingredient.nf_cholesterol;
      updatedIngredientList["sodium"] = ingredient.nf_sodium;
      updatedIngredientList["total_carbohydrate"] = ingredient.nf_total_carbohydrate;
      updatedIngredientList["dietary_fiber"] = ingredient.nf_dietary_fiber;
      updatedIngredientList["sugars"] = ingredient.nf_sugars;
      updatedIngredientList["protein"] = ingredient.nf_protein;
      updatedIngredientList["potassium"] = ingredient.nf_potassium;
      return updatedIngredientList
    })
    fetch('/edit', {
      method: 'PATCH',
      body: JSON.stringify({
        recipe: {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          image_url: recipe.image_url,
          ingredient_data: updatedIngredientList
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
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
