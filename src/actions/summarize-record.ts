"use server";

import { summarizePatientRecord, type SummarizePatientRecordInput, type SummarizePatientRecordOutput } from "@/ai/flows/summarize-patient-record";
import { z } from "zod";

const AISummaryFormSchema = z.object({
  notes: z.string().min(10, { message: "Notes must be at least 10 characters." }),
  labs: z.string().min(10, { message: "Lab results must be at least 10 characters." }),
  consultations: z.string().min(10, { message: "Consultation details must be at least 10 characters." }),
});

export type AISummaryFormValues = z.infer<typeof AISummaryFormSchema>;

interface ActionResult {
  success: boolean;
  summary?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function generateSummaryAction(
  prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const rawFormData = {
    notes: formData.get("notes"),
    labs: formData.get("labs"),
    consultations: formData.get("consultations"),
  };

  const validatedFields = AISummaryFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Validation failed. Please check the fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const inputData: SummarizePatientRecordInput = validatedFields.data;

  try {
    const result: SummarizePatientRecordOutput = await summarizePatientRecord(inputData);
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error("Error generating summary:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to generate summary: ${errorMessage}` };
  }
}
