import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());

app.get('/recipes', async (req, res) => {
  try {
    const allRecipes = await getRecipes();
    res.status(200).json({ success: true, payload: allRecipes })
  } catch(error) {
    res.status(500).json({ success: false, payload: error })
  }
})

app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await getRecipeByID(req.params.id);
    res.status(200).json({ success: true, payload: recipe })
  } catch (error) {
    res.status(500).json({ success: false, payload: error })
  }
});

app.post("/api/recipes", async (req, res) => { 

  try {
    const newRecipe = await createRecipe(req.body);
    
    res.status(200).json({ success: true, payload: newRecipe });

  }
  catch (error) {
    res.status(500).json({ success: false, payload: error })
  }
  
})

app.patch("/api/recipes/:id", async (req,res) => {

  try {
    const updatedRecipe = await updateRecipeByID(req.params.id, req.body);
    res.status(200).json({ success: true, payload: updatedRecipe })
  } catch (error) {
    res.status(500).json({ success: false, payload: error })
  }
});
  

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


