'use server';
/**
 * @fileOverview This file contains a Genkit flow that automatically categorizes reported issues using AI.
 *
 * - categorizeIssue - A function that categorizes an issue based on its description and media.
 * - CategorizeIssueInput - The input type for the categorizeIssue function.
 * - CategorizeIssueOutput - The return type for the categorizeIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeIssueInputSchema = z.object({
  description: z.string().describe('The description of the issue reported by the citizen.'),
  mediaDataUri: z
    .string()
    .optional()
    .describe(
      "A photo or video related to the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CategorizeIssueInput = z.infer<typeof CategorizeIssueInputSchema>;

const CategorizeIssueOutputSchema = z.object({
  category: z.string().describe('The predicted category of the issue.'),
  confidence: z.number().describe('The confidence level of the categorization (0-1).'),
});
export type CategorizeIssueOutput = z.infer<typeof CategorizeIssueOutputSchema>;

export async function categorizeIssue(input: CategorizeIssueInput): Promise<CategorizeIssueOutput> {
  return categorizeIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeIssuePrompt',
  input: {schema: CategorizeIssueInputSchema},
  output: {schema: CategorizeIssueOutputSchema},
  prompt: `You are an AI assistant that categorizes civic issues based on their descriptions and any provided media.

  Analyze the following issue report and determine the most appropriate category. Also, provide a confidence level (0-1) for your categorization.

  Description: {{{description}}}
  {{#if mediaDataUri}}
  Media: {{media url=mediaDataUri}}
  {{/if}}

  Respond with the category and confidence level. Possible categories include: [Roads & Highways, Sanitation, Public Safety, Water & Sewage, Parks & Recreation, Other].  If you are not sure, pick 'Other'.
  Format your response as a JSON object with 'category' and 'confidence' fields.
  `,
});

const categorizeIssueFlow = ai.defineFlow(
  {
    name: 'categorizeIssueFlow',
    inputSchema: CategorizeIssueInputSchema,
    outputSchema: CategorizeIssueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
