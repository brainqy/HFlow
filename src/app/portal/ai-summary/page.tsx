import { AISummaryForm } from '@/components/forms/AISummaryForm';
import { Brain, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function AISummaryPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <Brain className="h-8 w-8" /> AI-Powered Record Summarization
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate concise summaries from detailed patient records using AI.
        </p>
      </header>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle className="font-semibold">For Demonstration Purposes</AlertTitle>
        <AlertDescription>
          This tool uses AI to generate summaries. The generated content should be reviewed by a medical professional and not be used as a sole basis for clinical decisions. Ensure all patient data is handled securely and in compliance with privacy regulations.
        </AlertDescription>
      </Alert>
      
      <AISummaryForm />
    </div>
  );
}
