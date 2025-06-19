
// src/ai/flows/generate-recipe.ts
'use server';
/**
 * @fileOverview A recipe generation AI agent.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipeOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of ingredients the user has available. These should be edible food items.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  description: z.string().describe('A short, friendly description of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe, using ONLY the edible ingredients provided by the user.'),
  instructions: z.array(z.string()).describe('A list of instructions for preparing the recipe.'),
  alternativeMethod: z
    .object({
      description: z
        .string()
        .describe(
          'A description of an alternative method for preparing the recipe if a common piece of equipment is missing (e.g., oven, microwave).'
        ),
    })
    .optional()
    .describe('An alternative method for preparing the recipe if a common piece of equipment is missing.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a friendly, creative chef specializing in simple, delicious recipes using ONLY EDIBLE FOOD INGREDIENTS.

  Generate a recipe based on the edible food ingredients provided by the user.
  IMPORTANT: You MUST ONLY use the edible ingredients listed in the "Ingredients" section below. Do NOT add any extra ingredients to the recipe.
  If the user provides items that are clearly not edible (e.g., rocks, toys, soap), politely state that you can only cook with food items and do not include those non-edible items in the recipe.

  List the ingredients required for the recipe in the "ingredients" output field, ensuring they are from the user's provided list of edible items.

  The recipe instructions should be clear. If the primary method for your recipe involves a common piece of kitchen equipment (like an oven or microwave), also provide an "alternativeMethod" section in your output detailing how the recipe could be adapted if that common equipment is unavailable, perhaps suggesting stovetop or other accessible methods.

  Ingredients: {{ingredients}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
