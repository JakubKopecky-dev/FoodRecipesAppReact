import type { Ingredient } from "../ingredient/Ingredient";
import type { Recipe } from "./Recipe";

export interface DetailRecipe{
    recipe: Recipe
    ingredients: Ingredient[]
}