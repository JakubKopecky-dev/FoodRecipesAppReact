import type { CreateRecipe } from "../types/recipe/CreateRecipe";
import type { DetailRecipe } from "../types/recipe/DetailRecipe";
import type { PatchRecipeCategories } from "../types/recipe/PatchRecipeCategories";
import type { Recipe } from "../types/recipe/Recipe";
import type { RecipeWithCategory } from "../types/recipe/RecipeWithCategory";
import type { UpdateRecipe } from "../types/recipe/UpdateRecipe";

const BASE_URL = 'http://localhost:7500/api/Recipe';

export async function getAllRecipes(): Promise<RecipeWithCategory[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error('Failed to get recipes');
    }

    const data: RecipeWithCategory[] = await response.json();

    return data;
}



export async function getRecipeById(recipeId: string): Promise<Recipe> {
    const response = await fetch(`${BASE_URL}/${recipeId}`);

    if (response.status === 404) {
        throw new Error('Recipe not found')
    }

    if (!response.ok)
        throw new Error(`Failed to get recipe with id: ${recipeId}`);

    const data: Recipe = await response.json();

    return data;
}



export async function getRecipeDateilById(recipeId: string): Promise<DetailRecipe> {
    const response = await fetch(`${BASE_URL}/${recipeId}`);

    if (response.status === 404)
        throw new Error('Recipe not found')

    if (!response.ok)
        throw new Error('Failed to get recipe');

    const data: DetailRecipe = await response.json();

    return data;
}



export async function CreateRecipe(recipe: CreateRecipe): Promise<RecipeWithCategory> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    if (!response.ok)
        throw new Error('Failed to create recipe');

    const data: RecipeWithCategory = await response.json();

    return data;
}



export async function updateRecipe(recipeId: string, recipe: UpdateRecipe) {
    const response = await fetch(`${BASE_URL}/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    if (response.status === 404)
        throw new Error('Recipe not found');

    if (!response.ok)
        throw new Error('Failed to update recipe');

    const data: RecipeWithCategory = await response.json();

    return data;
}



export async function patchRecipeCategories(recipeId: string, recipe: PatchRecipeCategories): Promise<RecipeWithCategory> {
    const response = await fetch(`${BASE_URL}/${recipeId}/categories`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    if (response.status === 404)
        throw new Error('Recipe not found');

    if (!response.ok)
        throw new Error('Failed to patch recipe categories');

    const data: RecipeWithCategory = await response.json();

    return data;
}



export async function deleteRecipe(recipeId: string): Promise<Recipe> {
    const response = await fetch(`${BASE_URL}/${recipeId}`, {
        method: 'DELETE'
    });

    if (response.status === 404)
        throw new Error('Recipe not found');

    if (!response.ok)
        throw new Error('Failed to delete recipe');

    const data: Recipe = await response.json();

    return data;
}





