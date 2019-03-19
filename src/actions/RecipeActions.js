expert function RecipeSearch(e, data) {
  e.preventDefault();
  return fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${data}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
      'x-app-key': process.env.REACT_APP_NUTRITIONIX_KEY,
    }
  }).then(res => res.json())
  .then(res => console.log(res))
}
