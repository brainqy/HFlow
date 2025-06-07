
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { placeholderMedications } from "@/lib/placeholder-data";
import Link from "next/link";
import { RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";
import type { Medication } from "@/types";

const refillRequestSchema = z.object({
  medicationId: z.string().min(1, { message: "Please select a medication." }),
});

type RefillRequestFormValues = z.infer<typeof refillRequestSchema>;

const isMedicationActive = (medication: Medication) => {
  if (!medication.endDate) return true; 
  return new Date(medication.endDate) >= new Date();
};

export default function RequestRefillPage() {
  const { toast } = useToast();
  const activeMedications = placeholderMedications.filter(isMedicationActive);

  const form = useForm<RefillRequestFormValues>({
    resolver: zodResolver(refillRequestSchema),
    defaultValues: {
      medicationId: "",
    },
  });

  async function onSubmit(data: RefillRequestFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    const selectedMedication = activeMedications.find(med => med.id === data.medicationId);
    
    toast({
      title: "Refill Requested",
      description: `Your request to refill ${selectedMedication?.name || 'the selected medication'} has been submitted. Our pharmacy will review it shortly.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
            <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/portal/medications" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Medications
                </Link>
            </Button>
            <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <RefreshCw className="h-8 w-8" /> Request Medication Refill
            </h1>
            <p className="text-muted-foreground mt-1">
            Select a medication from your current prescriptions to request a refill.
            </p>
        </div>
      </header>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Select Medication for Refill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeMedications.length > 0 ? (
                <FormField
                  control={form.control}
                  name="medicationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a medication to refill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeMedications.map(med => (
                            <SelectItem key={med.id} value={med.id}>
                              {med.name} ({med.dosage}) - {med.refillsRemaining} refill(s) left
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="p-4 text-sm text-muted-foreground border rounded-md flex items-center gap-2 bg-secondary/50">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    You have no active medications eligible for online refill requests at this time. Please contact the clinic if you need assistance.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || activeMedications.length === 0}>
                {form.formState.isSubmitting ? "Submitting Request..." : "Submit Refill Request"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
