// src/ai/flows/get-nutrition-information.ts
'use server';

/**
 * @fileOverview Retrieves nutritional information for a given recipe using the Gemini API.
 *
 * - getNutritionInfo - A function that takes a list of ingredients and returns the estimated nutritional information.
 * - GetNutritionInfoInput - The input type for the getNutritionInfo function.
 * - GetNutritionInfoOutput - The return type for the getNutritionInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetNutritionInfoInputSchema = z.object({
  ingredients: z.array(z.string()).describe('List of ingredients in the recipe.'),
});
export type GetNutritionInfoInput = z.infer<typeof GetNutritionInfoInputSchema>;

const GetNutritionInfoOutputSchema = z.object({
  calories: z.string().describe('Estimated number of calories in the recipe.'),
  protein: z.string().describe('Estimated amount of protein in the recipe.'),
  carbs: z.string().describe('Estimated amount of carbohydrates in the recipe.'),
  fat: z.string().describe('Estimated amount of fat in the recipe.'),
  disclaimer: z
    .string()
    .describe('A friendly disclaimer that this is just an estimate.'),
});
export type GetNutritionInfoOutput = z.infer<typeof GetNutritionInfoOutputSchema>;

export async function getNutritionInfo(input: GetNutritionInfoInput): Promise<GetNutritionInfoOutput> {
  return getNutritionInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getNutritionInfoPrompt',
  input: {schema: GetNutritionInfoInputSchema},
  output: {schema: GetNutritionInfoOutputSchema},
  prompt: `As a happy health-bot, provide an estimated nutritional breakdown for a recipe with these ingredients: {{{ingredients}}}. Keep it simple! And add a cute disclaimer that this is just a friendly estimate.`,
});

const getNutritionInfoFlow = ai.defineFlow(
  {
    name: 'getNutritionInfoFlow',
    inputSchema: GetNutritionInfoInputSchema,
    outputSchema: GetNutritionInfoOutputSchema,
  },
  async input => {
    const {
      output,
    } = await prompt({
      ingredients: input.ingredients.join(', '),
    });
    return output!;
  }
);
