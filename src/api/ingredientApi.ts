import type { CreateUpdateIngredient } from "../types/ingredient/CreateUpdateIngredient";
import type { Ingredient } from "../types/ingredient/Ingredient";

const BASE_URL = 'http://localhost:7500/api/Ingredient';

export async function getIngredientById(ingredientId: string): Promise<Ingredient> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`);

    if (response.status === 404)
        throw new Error('Ingredient not found');

    if (!response.ok)
        throw new Error('Failed to get ingredient');

    const data: Ingredient = await response.json();

    return data;
}



export async function createIngredient(ingredient: CreateUpdateIngredient): Promise<Ingredient> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
    });

    if (!response.ok)
        throw new Error('Failed to create ingredient');

    const data: Ingredient = await response.json();

    return data;
}



export async function updateIngredient(ingredientId: string, ingredient: CreateUpdateIngredient): Promise<Ingredient> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
    });

    if (response.status === 404)
        throw new Error('Ingredient not found');

    if (!response.ok)
        throw new Error('Failed to update ingredient');

    const data: Ingredient = await response.json();

    return data;
}



export async function deleteIngredient(ingredientId: string): Promise<Ingredient> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`, {
        method: 'DELETE'
    });

    if (response.status === 404)
        throw new Error('Ingredient not found');

    if (!response.ok)
        throw new Error('Failed to delete ingredient');

    const data: Ingredient = await response.json();

    return data;
}