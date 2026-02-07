import type { RecipeWithCategory } from "../types/recipe/RecipeWithCategory";

const BASE_URL = 'http://localhost:7500/api/Recipe';

export async function getAllRecipes(): Promise<RecipeWithCategory[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data: RecipeWithCategory[] = await response.json();

    return data;
}