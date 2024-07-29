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
export async function createRecipe(newRecipe) {}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {}
