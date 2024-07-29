import fs from "node:fs/promises";
import { receiveMessageOnPort } from "node:worker_threads";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
    const allRecipes = await fs.readFile(fileName, { encoding: 'utf8' })
    const allRecipesJSON = JSON.parse(allRecipes);
    return allRecipesJSON
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
    const allRecipes = await fs.readFile(fileName, { encoding: 'utf8' });
    const allRecipesJSON = JSON.parse(allRecipes);
    let recipeIndex = allRecipesJSON.findIndex(i => i.id === id); 
    return allRecipesJSON[recipeIndex]
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
    const allRecipes = await fs.readFile(fileName, { encoding: 'utf8' }); // got the allRecipes file
    const allRecipesJSON = JSON.parse(allRecipes); // converted this into a JSON object from a string so we can manipulate it.
    // console.log(allRecipesJSON)
    allRecipesJSON.push(newRecipe); // added a newRecipe to the allRecipesJSON object
    // console.log(allRecipesJSON);
    const allRecipesString = JSON.stringify(allRecipesJSON); // converting the JSON object into a string so we can write it back in L28
    fs.writeFile(fileName, allRecipesString, { encoding: 'utf8' }) //writing back to the file
    return newRecipe; // returning the new recipe
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
	const allRecipes = await fs.readFile(fileName, { encoding: "utf8" }); // got the allRecipes file
	const allRecipesJSON = JSON.parse(allRecipes); // converted this into a JSON object from a string so we can manipulate it.
	// console.log(allRecipesJSON);

	let recipeIndex = allRecipesJSON.findIndex((i) => i.id === id);

	allRecipesJSON[recipeIndex] = updatedRecipe;

	const allRecipesString = JSON.stringify(allRecipesJSON); // converting the JSON object into a string so we can write it back in L28
    fs.writeFile(fileName, allRecipesString, { encoding: "utf8" }); //writing back to the file
    
	return updatedRecipe;
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
    const allRecipes = await fs.readFile(fileName, { encoding: "utf8" }); // got the allRecipes file
	const allRecipesJSON = JSON.parse(allRecipes); // converted this into a JSON object from a string so we can manipulate it.
    // console.log(allRecipesJSON)
    let recipeIndex = allRecipesJSON.findIndex((i) => i.id === id); // Find the index of the recipe to delete
    const deletedRecipe = allRecipesJSON[recipeIndex] // save that recipe to a variable so we can return it
    allRecipesJSON.splice(recipeIndex, recipeIndex) // remove the recipe from the array
    // console.log(allRecipesJSON)
    const allRecipesString = JSON.stringify(allRecipesJSON); // converting the JSON object into a string so we can write it back in L28
    fs.writeFile(fileName, allRecipesString, { encoding: "utf8" }); //writing back to the file
    return deletedRecipe
}


// {"id":"4c848d48-b81e-4d6f-b45d-7b3090f4f8ef","title":"Beans on Toast","ingredients":["150g of beans","150g of butter","150g of toast"],"instructions":"Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the beans, slowly.\n  \n    Season to taste.","image":"https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg"}