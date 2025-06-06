
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
import { useState } from "react";

const emailLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const phoneLoginSchema = z.object({
  phone: z.string().min(10, { message: "Please enter a valid phone number (e.g., +1234567890)." }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

type EmailLoginFormValues = z.infer<typeof emailLoginSchema>;
type PhoneLoginFormValues = z.infer<typeof phoneLoginSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"email" | "phone">("email");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const emailForm = useForm<EmailLoginFormValues>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const phoneForm = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onEmailSubmit(data: EmailLoginFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "patient@example.com" && data.password === "password123") {
      toast({
        title: "Login Successful!",
        description: "Welcome back! Redirecting you to your portal...",
      });
      router.push("/portal/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      emailForm.setValue("password", "");
    }
  }

  async function onPhoneSubmit(data: PhoneLoginFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setPhoneNumber(data.phone);
    setOtpSent(true);
    toast({
      title: "OTP Sent (Mock)",
      description: `An OTP has been "sent" to ${data.phone}. Please enter it below. (Use 123456 for demo)`,
    });
    phoneForm.reset(); // Clear phone input after "sending" OTP
  }

  async function onOtpSubmit(data: OtpFormValues) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    // Mock verification
    if (phoneNumber === "+15551234567" && data.otp === "123456") {
      toast({
        title: "Phone Login Successful!",
        description: "Welcome back! Redirecting you to your portal...",
      });
      router.push("/portal/dashboard");
    } else {
      toast({
        title: "OTP Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    }
    otpForm.reset();
    // Optionally reset otpSent and phoneNumber if login fails and you want them to re-enter phone
    // setOtpSent(false); 
    // setPhoneNumber("");
  }

  const toggleAuthMode = () => {
    setAuthMode(prev => (prev === "email" ? "phone" : "email"));
    setOtpSent(false);
    setPhoneNumber("");
    emailForm.reset();
    phoneForm.reset();
    otpForm.reset();
  };

  return (
    <div className="space-y-6">
      {authMode === "email" && !otpSent && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={emailForm.control}
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
            <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
              {emailForm.formState.isSubmitting ? "Logging in..." : "Login to Patient Portal"}
            </Button>
            <div className="text-sm text-center">
              <Link href="/forgot-password" className="font-medium text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      )}

      {authMode === "phone" && !otpSent && (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
            <FormField
              control={phoneForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+15551234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={phoneForm.formState.isSubmitting}>
              {phoneForm.formState.isSubmitting ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </Form>
      )}

      {authMode === "phone" && otpSent && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
            <p className="text-sm text-muted-foreground text-center">
              Enter the 6-digit OTP sent to {phoneNumber}.
            </p>
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password (OTP)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123456" maxLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={otpForm.formState.isSubmitting}>
              {otpForm.formState.isSubmitting ? "Verifying..." : "Verify OTP & Login"}
            </Button>
            <Button variant="link" onClick={() => {setOtpSent(false); setPhoneNumber(""); phoneForm.reset();}} className="w-full text-sm">
              Entered wrong number?
            </Button>
          </form>
        </Form>
      )}

      <div className="text-center">
        <Button variant="link" onClick={toggleAuthMode} className="text-primary">
          {authMode === "email" ? "Sign in with Phone Number" : "Sign in with Email"}
        </Button>
      </div>
    </div>
  );
}
