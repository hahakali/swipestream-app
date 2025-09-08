'use server';

/**
 * @fileOverview Dynamically generates a subscription prompt for users attempting to access premium content.
 *
 * - generateSubscriptionPrompt - Generates a subscription prompt based on user's subscription status.
 * - SubscriptionPromptInput - The input type for the generateSubscriptionPrompt function.
 * - SubscriptionPromptOutput - The return type for the generateSubscriptionPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubscriptionPromptInputSchema = z.object({
  isSubscribed: z.boolean().describe('Whether the user is currently subscribed.'),
  contentName: z.string().describe('The name of the premium content being accessed.'),
  subscriptionBenefits: z.array(z.string()).describe('A list of benefits included in the subscription.'),
});
export type SubscriptionPromptInput = z.infer<typeof SubscriptionPromptInputSchema>;

const SubscriptionPromptOutputSchema = z.object({
  prompt: z.string().describe('The generated subscription prompt.'),
});
export type SubscriptionPromptOutput = z.infer<typeof SubscriptionPromptOutputSchema>;

export async function generateSubscriptionPrompt(input: SubscriptionPromptInput): Promise<SubscriptionPromptOutput> {
  return subscriptionPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'subscriptionPrompt',
  input: {schema: SubscriptionPromptInputSchema},
  output: {schema: SubscriptionPromptOutputSchema},
  prompt: `You are a helpful assistant designed to generate subscription prompts.

  Generate a friendly and informative subscription prompt for a user who is trying to access premium content but is not subscribed.
  The content name is: {{{contentName}}}.
  The subscription benefits are: {{#each subscriptionBenefits}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

  The prompt should clearly explain the benefits of subscribing and guide the user through the payment process. The prompt should be no more than 3 sentences long.
  If the user IS subscribed, generate a prompt that indicates that they already have access to this content and can view it.
  `,
});

const subscriptionPromptFlow = ai.defineFlow(
  {
    name: 'subscriptionPromptFlow',
    inputSchema: SubscriptionPromptInputSchema,
    outputSchema: SubscriptionPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
