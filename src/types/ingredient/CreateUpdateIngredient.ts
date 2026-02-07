import type { IngredientUnit } from "./IngredientUnit"

export interface CreateUpdateIngredient{
        title: string
        unit: IngredientUnit
        quantity: number
        recipeId: number
}