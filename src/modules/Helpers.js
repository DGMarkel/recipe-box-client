export const formatRecipeURL = recipe => recipe.toLowerCase().replace(/\s/g , "-" )

export const sumNutritionalDataFor = (ingredients, dataPoint) => Math.round(ingredients.map(i => i[dataPoint]).reduce((a,b)=>a+b,0))
