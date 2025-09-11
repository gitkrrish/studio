'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary of an issue for administrators.
 *
 * The flow takes an issue description as input and returns a concise summary.
 * - generateSummaryForAdmin - A function that generates the issue summary.
 * - GenerateSummaryForAdminInput - The input type for the generateSummaryForAdmin function.
 * - GenerateSummaryForAdminOutput - The return type for the generateSummaryForAdmin function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummaryForAdminInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('The description of the issue reported by the citizen.'),
});
export type GenerateSummaryForAdminInput = z.infer<
  typeof GenerateSummaryForAdminInputSchema
>;

const GenerateSummaryForAdminOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the issue, highlighting key details and urgency.'),
});
export type GenerateSummaryForAdminOutput = z.infer<
  typeof GenerateSummaryForAdminOutputSchema
>;

export async function generateSummaryForAdmin(
  input: GenerateSummaryForAdminInput
): Promise<GenerateSummaryForAdminOutput> {
  return generateSummaryForAdminFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryForAdminPrompt',
  input: {schema: GenerateSummaryForAdminInputSchema},
  output: {schema: GenerateSummaryForAdminOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing civic issues for administrators.

  Given the following issue description, provide a concise summary that highlights the key details and the urgency of the issue.

  Issue Description: {{{issueDescription}}}

  Summary:`,
});

const generateSummaryForAdminFlow = ai.defineFlow(
  {
    name: 'generateSummaryForAdminFlow',
    inputSchema: GenerateSummaryForAdminInputSchema,
    outputSchema: GenerateSummaryForAdminOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
