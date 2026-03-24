import type { IngredientUnit } from "./IngredientUnit"

export type Ingredient = {
    id: string
    title: string
    createdAt: string
    updatedAt: string | null
    unit: IngredientUnit
    quantity: number
    recipeId: string
}