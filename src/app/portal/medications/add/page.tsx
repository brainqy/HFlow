
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { PlusCircle, ArrowLeft } from "lucide-react";

const addOtcMedicationSchema = z.object({
  name: z.string().min(2, { message: "Medication name must be at least 2 characters." }),
  dosage: z.string().min(1, { message: "Dosage is required (e.g., 200mg, 1 tablet)." }),
  frequency: z.string().min(3, { message: "Frequency is required (e.g., as needed, once daily)." }),
  reason: z.string().optional(),
});

type AddOtcMedicationFormValues = z.infer<typeof addOtcMedicationSchema>;

export default function AddOtcMedicationPage() {
  const { toast } = useToast();
  const form = useForm<AddOtcMedicationFormValues>({
    resolver: zodResolver(addOtcMedicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      reason: "",
    },
  });

  async function onSubmit(data: AddOtcMedicationFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    console.log("OTC Medication Added:", data); 
    toast({
      title: "Medication Added to Record",
      description: `${data.name} has been added to your medication list (for your records). This is not a prescription request.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-8">
      <header>
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/portal/medications" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Medications
            </Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <PlusCircle className="h-8 w-8" /> Add Over-the-Counter Medication
        </h1>
        <p className="text-muted-foreground mt-1">
          Keep track of non-prescription medications or supplements you are taking.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
              <CardDescription>
                This information is for your personal records and will not be reviewed as a prescription request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ibuprofen, Vitamin C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 200mg, 1 tablet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., As needed for pain, Once daily" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Taking (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Headache, Immune support" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding..." : "Add to My Records"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
