import type { IngredientUnit } from "./IngredientUnit"

export type CreateUpdateIngredient = {
        title: string
        unit: IngredientUnit
        quantity: number
        recipeId: string
}