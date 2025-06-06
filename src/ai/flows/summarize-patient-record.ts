// Summarizes a patient's medical records.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientRecordInputSchema = z.object({
  notes: z.string().describe('The patient medical notes.'),
  labs: z.string().describe('The patient lab results.'),
  consultations: z.string().describe('The patient previous consultations.'),
});
export type SummarizePatientRecordInput = z.infer<typeof SummarizePatientRecordInputSchema>;

const SummarizePatientRecordOutputSchema = z.object({
  summary: z.string().describe('A summary of the patient medical record.'),
});
export type SummarizePatientRecordOutput = z.infer<typeof SummarizePatientRecordOutputSchema>;

export async function summarizePatientRecord(input: SummarizePatientRecordInput): Promise<SummarizePatientRecordOutput> {
  return summarizePatientRecordFlow(input);
}

const summarizePatientRecordPrompt = ai.definePrompt({
  name: 'summarizePatientRecordPrompt',
  input: {schema: SummarizePatientRecordInputSchema},
  output: {schema: SummarizePatientRecordOutputSchema},
  prompt: `You are an expert medical summarizer.

  Please summarize the following patient medical record, including notes, labs, and previous consultations. Be concise and to the point. Make sure to include any diagnosis or prescriptions.

  Notes: {{{notes}}}
  Labs: {{{labs}}}
  Consultations: {{{consultations}}}
  `,
});

const summarizePatientRecordFlow = ai.defineFlow(
  {
    name: 'summarizePatientRecordFlow',
    inputSchema: SummarizePatientRecordInputSchema,
    outputSchema: SummarizePatientRecordOutputSchema,
  },
  async input => {
    const {output} = await summarizePatientRecordPrompt(input);
    return output!;
  }
);
