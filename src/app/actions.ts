// src/app/actions.ts
'use server';

import { generateRecipe as generateRecipeFlow, GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { suggestDrinkPairings as suggestDrinkPairingsFlow, SuggestDrinkPairingsInput, SuggestDrinkPairingsOutput } from '@/ai/flows/suggest-drink-pairings';
import { getNutritionInfo as getNutritionInfoFlow, GetNutritionInfoInput, GetNutritionInfoOutput } from '@/ai/flows/get-nutrition-information';

export async function generateRecipeAction(input: GenerateRecipeInput): Promise<GenerateRecipeOutput | { error: string }> {
  try {
    if (!input.ingredients || input.ingredients.length === 0) {
      return { error: "Oopsie! Please add some ingredients to get a recipe." };
    }
    const result = await generateRecipeFlow(input);
    if (!result || !result.recipeName) {
        return { error: "Kawaii Chef is a bit stumped! Could you try different ingredients or be more specific?" };
    }
    return result;
  } catch (e) {
    console.error("Error in generateRecipeAction:", e);
    return { error: "Oh no! Something went wrong while generating the recipe. Please try again!" };
  }
}

export async function suggestDrinkPairingsAction(input: SuggestDrinkPairingsInput): Promise<SuggestDrinkPairingsOutput | { error: string }> {
  try {
    const result = await suggestDrinkPairingsFlow(input);
     if (!result || !result.wine || !result.beer || !result.non_alcoholic) {
        return { error: "Hmm, couldn't quite find the perfect sips for this! Maybe try again?" };
    }
    return result;
  } catch (e) {
    console.error("Error in suggestDrinkPairingsAction:", e);
    return { error: "A little hiccup suggesting drinks! Please try again." };
  }
}

export async function getNutritionInfoAction(input: GetNutritionInfoInput): Promise<GetNutritionInfoOutput | { error: string }> {
  try {
    const result = await getNutritionInfoFlow(input);
    if (!result || !result.calories) {
        return { error: "Counting those beans (or calories) failed! Please try again." };
    }
    return result;
  } catch (e) {
    console.error("Error in getNutritionInfoAction:", e);
    return { error: "Oops! Couldn't fetch nutrition info. Please try again." };
  }
}

    