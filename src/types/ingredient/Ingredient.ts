import type { IngredientUnit } from "./IngredientUnit"

export interface Ingredient{
    id: string
    title: string
    createdAt: string
    updatedAt: string | null
    unit: IngredientUnit
    quantity: number
    recipeId: string
}