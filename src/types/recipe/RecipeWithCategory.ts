export type RecipeWithCategory ={
    id: string
    title: string
    createdAt: string
    updatedAt: string | null
    rating: number | null
    instruction: string | null
    cookingTimeInMinutes: number | null
    categories: string[]
}