
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
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const visitingDoctorLoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type VisitingDoctorLoginFormValues = z.infer<typeof visitingDoctorLoginFormSchema>;

export function VisitingDoctorLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<VisitingDoctorLoginFormValues>({
    resolver: zodResolver(visitingDoctorLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: VisitingDoctorLoginFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    // Hardcoded credentials for demo
    if (data.email === "visiting.doc@example.com" && data.password === "password123") {
      toast({
        title: "Login Successful!",
        description: "Welcome, Visiting Doctor! Redirecting you to your dashboard...",
      });
      router.push("/visiting-doctor/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      form.setValue("password", ""); 
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="visiting.doc@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Logging in..." : "Login to Visiting Doctor Portal"}
        </Button>
        <div className="text-sm text-center">
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>
      </form>
    </Form>
  );
}
