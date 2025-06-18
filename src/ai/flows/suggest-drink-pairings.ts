// src/ai/flows/suggest-drink-pairings.ts
'use server';

/**
 * @fileOverview Flow for suggesting drink pairings (wine, beer, and non-alcoholic) for a given recipe.
 *
 * - suggestDrinkPairings - A function that suggests drink pairings for a recipe.
 * - SuggestDrinkPairingsInput - The input type for the suggestDrinkPairings function.
 * - SuggestDrinkPairingsOutput - The return type for the suggestDrinkPairings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDrinkPairingsInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients in the recipe.'),
});

export type SuggestDrinkPairingsInput = z.infer<typeof SuggestDrinkPairingsInputSchema>;

const SuggestDrinkPairingsOutputSchema = z.object({
  wine: z.object({
    pairing: z.string().describe('A wine pairing suggestion.'),
    reason: z.string().describe('The reason why this wine is a good match.'),
  }).describe('Wine Pairing'),
  beer: z.object({
    pairing: z.string().describe('A beer pairing suggestion.'),
    reason: z.string().describe('The reason why this beer is a good match.'),
  }).describe('Beer Pairing'),
  non_alcoholic: z.object({
    pairing: z.string().describe('A non-alcoholic drink pairing suggestion.'),
    reason: z.string().describe('The reason why this non-alcoholic drink is a good match.'),
  }).describe('Non-Alcoholic Pairing'),
});

export type SuggestDrinkPairingsOutput = z.infer<typeof SuggestDrinkPairingsOutputSchema>;

export async function suggestDrinkPairings(input: SuggestDrinkPairingsInput): Promise<SuggestDrinkPairingsOutput> {
  return suggestDrinkPairingsFlow(input);
}

const suggestDrinkPairingsPrompt = ai.definePrompt({
  name: 'suggestDrinkPairingsPrompt',
  input: {schema: SuggestDrinkPairingsInputSchema},
  output: {schema: SuggestDrinkPairingsOutputSchema},
  prompt: `You are a friendly sommelier. For a {{{recipeName}}} dish with the following ingredients: {{{ingredients}}}, suggest one cute wine pairing, one fun beer pairing, and one delightful non-alcoholic drink pairing. Explain why each is a good match in a fun, simple way.

Ensure the output is structured as a JSON object matching the schema.`,
});

const suggestDrinkPairingsFlow = ai.defineFlow(
  {
    name: 'suggestDrinkPairingsFlow',
    inputSchema: SuggestDrinkPairingsInputSchema,
    outputSchema: SuggestDrinkPairingsOutputSchema,
  },
  async input => {
    const {output} = await suggestDrinkPairingsPrompt(input);
    return output!;
  }
);
