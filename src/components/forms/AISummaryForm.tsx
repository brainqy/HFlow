"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateSummaryAction, AISummaryFormValues } from "@/actions/summarize-record";
import { useEffect, useRef, useState } from "react";
import { samplePatientNotes, sampleLabResults, sampleConsultations } from "@/lib/placeholder-data";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full md:w-auto" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      ) : (
        <>
         <Wand2 className="mr-2 h-4 w-4" /> Generate Summary
        </>
      )}
    </Button>
  );
}

export function AISummaryForm() {
  const [state, formAction] = useFormState(generateSummaryAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState<AISummaryFormValues>({
      notes: '',
      labs: '',
      consultations: '',
  });

  useEffect(() => {
    if (state?.success) {
      // Optionally clear form or keep data
      // formRef.current?.reset(); 
      // setFormValues({ notes: '', labs: '', consultations: ''});
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const loadSampleData = () => {
    setFormValues({
        notes: samplePatientNotes,
        labs: sampleLabResults,
        consultations: sampleConsultations,
    });
  };


  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Powered Record Summarizer</CardTitle>
          <CardDescription>
            Input patient notes, lab results, and consultation details to generate a concise summary.
            <Button variant="link" onClick={loadSampleData} className="p-0 ml-2 h-auto text-primary">(Load Sample Data)</Button>
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="notes" className="text-lg font-medium">Patient Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Enter patient notes here..."
                className="mt-2 min-h-[150px]"
                value={formValues.notes}
                onChange={handleInputChange}
                aria-invalid={!!state?.fieldErrors?.notes}
                aria-describedby="notes-error"
              />
              {state?.fieldErrors?.notes && (
                <p id="notes-error" className="text-sm text-destructive mt-1">{state.fieldErrors.notes.join(", ")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="labs" className="text-lg font-medium">Lab Results</Label>
              <Textarea
                id="labs"
                name="labs"
                placeholder="Enter lab results here..."
                className="mt-2 min-h-[150px]"
                value={formValues.labs}
                onChange={handleInputChange}
                aria-invalid={!!state?.fieldErrors?.labs}
                aria-describedby="labs-error"
              />
              {state?.fieldErrors?.labs && (
                 <p id="labs-error" className="text-sm text-destructive mt-1">{state.fieldErrors.labs.join(", ")}</p>
              )}
            </div>
            <div>
              <Label htmlFor="consultations" className="text-lg font-medium">Previous Consultations</Label>
              <Textarea
                id="consultations"
                name="consultations"
                placeholder="Enter previous consultation details here..."
                className="mt-2 min-h-[150px]"
                value={formValues.consultations}
                onChange={handleInputChange}
                aria-invalid={!!state?.fieldErrors?.consultations}
                aria-describedby="consultations-error"
              />
              {state?.fieldErrors?.consultations && (
                <p id="consultations-error" className="text-sm text-destructive mt-1">{state.fieldErrors.consultations.join(", ")}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <SubmitButton />
            {state?.error && !state.fieldErrors && (
              <Alert variant="destructive" className="w-full">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>

      {state?.success && state.summary && (
        <Card className="shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
              <Sparkles className="h-6 w-6" /> Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none p-4 bg-primary/5 rounded-md">
              <p>{state.summary.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
