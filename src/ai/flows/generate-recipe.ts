// src/ai/flows/generate-recipe.ts
'use server';
/**
 * @fileOverview A recipe generation AI agent.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of ingredients the user has available.'),
  equipment: z.array(z.string()).describe('A list of kitchen equipment the user has available.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  description: z.string().describe('A short, friendly description of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
  instructions: z.array(z.string()).describe('A list of instructions for preparing the recipe.'),
  alternativeMethod: z
    .object({
      description: z
        .string()
        .describe(
          'A description of an alternative method for preparing the recipe if a common piece of equipment is missing.'
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
  prompt: `You are a friendly, creative chef specializing in simple, delicious recipes.

  Generate a recipe based on the ingredients and equipment provided by the user.  If a common piece of equipment is missing, provide an "alternativeMethod" section.

  Ingredients: {{ingredients}}
  Equipment: {{equipment}}`,
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
