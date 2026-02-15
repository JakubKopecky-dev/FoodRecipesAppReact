import type { Ingredient } from "../ingredient/Ingredient";
import type { RecipeWithCategory } from "./RecipeWithCategory";

export interface DetailRecipe{
    recipe: RecipeWithCategory
    ingredients: Ingredient[]
}