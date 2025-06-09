
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { allClinicAppointments, placeholderVisitingDoctors } from '@/lib/placeholder-data';
import type { DoctorAppointment } from '@/types';
import { CalendarCheck, Eye, User, Clock, FileText as ReasonIcon, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function VisitingDoctorSchedulePage() {
  // For prototype, assume a logged-in visiting doctor. Hardcode ID for data filtering.
  const visitingDoctorId = "visiting-doc-1"; 
  const visitingDoctorProfile = placeholderVisitingDoctors.find(vd => vd.id === visitingDoctorId);
  const doctorName = visitingDoctorProfile?.name || "Visiting Doctor";

  const myAppointments = useMemo(() => {
    return allClinicAppointments
      .filter(appt => appt.doctorId === visitingDoctorId)
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time));
  }, [visitingDoctorId]);

  const getStatusBadgeVariant = (status: DoctorAppointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'default'; 
      case 'Checked-in': return 'secondary';
      case 'Completed': return 'outline';
      case 'Cancelled': return 'destructive';
      case 'Pending Confirmation': return 'outline'; 
      default: return 'outline';
    }
  };
  
  const getStatusBadgeClassName = (status: DoctorAppointment['status']) => {
    if (status === 'Completed') return 'border-green-500 text-green-600 bg-green-500/10';
    if (status === 'Checked-in') return 'border-yellow-500 text-yellow-600 bg-yellow-500/10';
    if (status === 'Pending Confirmation') return 'border-blue-500 text-blue-600 bg-blue-500/10';
    return '';
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <CalendarCheck className="h-8 w-8" /> My Assigned Schedule
        </h1>
        <p className="text-muted-foreground mt-1">
          Viewing appointments assigned to {doctorName}.
          {visitingDoctorProfile?.assignmentPeriod && <span className="block text-sm">Assignment Period: {visitingDoctorProfile.assignmentPeriod}</span>}
        </p>
      </header>

      {myAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> {appointment.patientName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm flex-grow">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(appointment.date), "EEEE, MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <ReasonIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-muted-foreground"><span className="font-medium text-foreground">Reason:</span> {appointment.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Status:</span>
                    <Badge 
                        variant={getStatusBadgeVariant(appointment.status)}
                        className={getStatusBadgeClassName(appointment.status)}
                    >
                        {appointment.status}
                    </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-4 mt-auto">
                 <Link href={`/visiting-doctor/patients/${appointment.patientId}/chart`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> View Chart
                    </Button>
                 </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center py-8">No appointments found in your assigned schedule.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
