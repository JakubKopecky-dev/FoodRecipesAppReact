export interface CreateRecipe {
    title: string
    categoryNames: string[]
    rating: number | null
    instruction: string | null
    cookingTimeInMinutes: number | null
}