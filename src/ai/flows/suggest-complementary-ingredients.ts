
// src/ai/flows/suggest-complementary-ingredients.ts
'use server';
/**
 * @fileOverview Flow for suggesting complementary ingredients based on an initial list.
 *
 * - suggestComplementaryIngredients - A function that suggests complementary items.
 * - SuggestComplementaryIngredientsInput - The input type for the function.
 * - SuggestComplementaryIngredientsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComplementaryIngredientsInputSchema = z.object({
  initialIngredients: z.array(z.string()).describe('The initial list of edible ingredients the user has.'),
});
export type SuggestComplementaryIngredientsInput = z.infer<typeof SuggestComplementaryIngredientsInputSchema>;

const SuggestComplementaryIngredientsOutputSchema = z.object({
  suggestedItems: z.array(z.string()).describe('A list of suggested complementary edible food items, not already in the input list. Max 5 items.'),
});
export type SuggestComplementaryIngredientsOutput = z.infer<typeof SuggestComplementaryIngredientsOutputSchema>;

export async function suggestComplementaryIngredients(input: SuggestComplementaryIngredientsInput): Promise<SuggestComplementaryIngredientsOutput> {
  return suggestComplementaryIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComplementaryIngredientsPrompt',
  input: {schema: SuggestComplementaryIngredientsInputSchema},
  output: {schema: SuggestComplementaryIngredientsOutputSchema},
  prompt: `You are a helpful cooking assistant. Given this list of edible ingredients: {{{initialIngredients}}}, suggest a short list (up to 5) of common complementary edible food items that would typically be used with them to make a complete dish.

  IMPORTANT:
  - Only suggest items that are actual food ingredients.
  - Do NOT suggest any ingredients that are already present in the initial list: {{{initialIngredients}}}.
  - If no obvious complementary ingredients come to mind or if the initial list is very sparse/unusual, return an empty list for suggestedItems.
  - Ensure the output is structured as a JSON object matching the schema.
  - Provide ingredients in lowercase.
  - Example: If initialIngredients is ["chicken", "rice"], you might suggest ["onion", "garlic", "soy sauce", "ginger", "sesame oil"].
  - Example: If initialIngredients is ["flour", "sugar", "eggs"], you might suggest ["butter", "milk", "vanilla extract", "baking powder"].
  `,
   config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
    ],
  },
});

const suggestComplementaryIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestComplementaryIngredientsFlow',
    inputSchema: SuggestComplementaryIngredientsInputSchema,
    outputSchema: SuggestComplementaryIngredientsOutputSchema,
  },
  async input => {
    // Ensure initialIngredients is an array for the prompt, even if empty
    const promptInput = {
      initialIngredients: input.initialIngredients.length > 0 ? input.initialIngredients.join(', ') : 'none'
    };
    const {output} = await prompt(promptInput as any); // Cast because joining array changes type slightly for prompt template
    
    if (output && output.suggestedItems) {
      // Filter out any suggestions that might have slipped through and are already in the initial list (case-insensitive)
      const lowerInitialIngredients = input.initialIngredients.map(i => i.toLowerCase());
      output.suggestedItems = output.suggestedItems.filter(item => !lowerInitialIngredients.includes(item.toLowerCase()));
      return output;
    }
    return { suggestedItems: [] }; // Default to empty if no output or items
  }
);

    
