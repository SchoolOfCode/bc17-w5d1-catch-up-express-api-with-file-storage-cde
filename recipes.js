import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
    const allRecipes = await fs.readFile(fileName, { encoding: 'utf8' })
    return allRecipes
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
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}