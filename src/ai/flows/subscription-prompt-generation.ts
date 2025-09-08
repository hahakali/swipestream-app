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
  prompt: `你是一个乐于助人的助手，旨在生成订阅提示。

  为试图访问高级内容但未订阅的用户生成一个友好且内容丰富的订阅提示。
  内容名称是：{{{contentName}}}。
  订阅权益是：{{#each subscriptionBenefits}}{{{this}}}{{#unless @last}}，{{/unless}}{{/each}}。

  提示应清楚地解释订阅的好处，并引导用户完成支付过程。提示不得超过3句话。所有输出必须为中文。
  如果用户已经订阅，请生成一个提示，表明他们已经可以访问此内容并可以查看。
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
