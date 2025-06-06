"use client";

import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Clock, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId') || undefined;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Book Your Appointment
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Schedule your visit with one of our expert healthcare providers. Fill out the form below, and we'll be in touch to confirm.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Appointment Request Form</CardTitle>
              <CardDescription>
                Please provide your details and preferred appointment information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentForm doctorId={doctorId} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>123 Health St, Wellness City, CA 90210</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>(123) 456-7890</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Before Your Visit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <li>Please bring a valid ID and insurance card.</li>
              <li>Arrive 15 minutes early to complete any paperwork.</li>
              <li>Make a list of your current medications and allergies.</li>
              <li>If you need to cancel, please notify us at least 24 hours in advance.</li>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
