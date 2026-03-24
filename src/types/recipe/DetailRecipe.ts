import type { Ingredient } from "../ingredient/Ingredient";
import type { RecipeWithCategory } from "./RecipeWithCategory";

export type DetailRecipe = {
    recipe: RecipeWithCategory
    ingredients: Ingredient[]
}