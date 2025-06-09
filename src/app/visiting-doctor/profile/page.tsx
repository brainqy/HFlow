
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Mail, BriefcaseMedical, CalendarDays } from 'lucide-react';
import { placeholderVisitingDoctors } from '@/lib/placeholder-data';

export default function VisitingDoctorProfilePage() {
  // For prototype, assume a logged-in visiting doctor. Hardcode ID for data filtering.
  const visitingDoctorId = "visiting-doc-1"; 
  const profile = placeholderVisitingDoctors.find(vd => vd.id === visitingDoctorId);

  if (!profile) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <UserCog className="h-8 w-8" /> My Profile
          </h1>
        </header>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Visiting doctor profile not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Your details for your engagement with HealthFlow.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Professional Information</CardTitle>
            <CardDescription>Your identification and assignment details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
            <p><strong className="text-muted-foreground">Name:</strong> {profile.name}</p>
            <p><strong className="text-muted-foreground">Specialty:</strong> {profile.specialty}</p>
            <p className="flex items-center gap-1"><Mail className="h-4 w-4 text-muted-foreground" /> {profile.email}</p>
            {profile.assignmentPeriod && (
                <p className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-muted-foreground" /> 
                    <strong className="text-muted-foreground">Assignment Period:</strong> {profile.assignmentPeriod}
                </p>
            )}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground text-center">
          This is a read-only profile. For changes, please contact clinic administration.
      </p>
    </div>
  );
}
