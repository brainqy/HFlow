
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, Stethoscope, BriefcaseMedical, CheckCircle, Info } from 'lucide-react';
import { allClinicAppointments, placeholderDoctors } from '@/lib/placeholder-data';
import type { DoctorAppointment } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PatientAppointmentsPage() {
  // In a real app, you'd fetch this based on the logged-in user.
  // For now, we'll filter for "Jane Doe (Patient Portal User)".
  const patientName = "Jane Doe (Patient Portal User)";
  const patientAppointments = useMemo(() => {
    return allClinicAppointments
      .filter(appt => appt.patientName === patientName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time));
  }, [patientName]);

  const upcomingAppointments = useMemo(() => {
    return patientAppointments
      .filter(appt => new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0)) && appt.status !== 'Cancelled' && appt.status !== 'Completed')
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time));
  }, [patientAppointments]);

  const pastAppointments = useMemo(() => {
    return patientAppointments
      .filter(appt => new Date(appt.date) < new Date(new Date().setHours(0,0,0,0)) || appt.status === 'Cancelled' || appt.status === 'Completed');
  }, [patientAppointments]);

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

  const AppointmentCard = ({ appointment }: { appointment: DoctorAppointment }) => {
    const doctor = placeholderDoctors.find(d => d.id === appointment.doctorId);
    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" /> 
              {appointment.doctorName}
            </CardTitle>
            <Badge 
                variant={getStatusBadgeVariant(appointment.status)}
                className={getStatusBadgeClassName(appointment.status)}
            >
                {appointment.status}
            </Badge>
          </div>
          {doctor && <CardDescription className="text-sm">{doctor.specialty}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" /> 
            {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> 
            {appointment.time}
          </p>
          <p className="flex items-start gap-2">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> 
            <span className="text-muted-foreground"><strong className="text-foreground">Reason:</strong> {appointment.reason}</span>
          </p>
          {appointment.reminderSent && (
            <p className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle className="h-3 w-3"/> Reminder Sent
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {(appointment.status === 'Scheduled' || appointment.status === 'Pending Confirmation') && (
            <Button variant="outline" size="sm" className="opacity-70 cursor-not-allowed">Reschedule</Button>
          )}
          <Button variant="link" size="sm" asChild className="p-0">
            <Link href={`/doctors/${appointment.doctorId}`}>View Doctor Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderAppointmentGrid = (appointments: DoctorAppointment[], emptyMessage: string) => {
    if (appointments.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">{emptyMessage}</p>
          </CardContent>
        </Card>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <CalendarDays className="h-8 w-8" /> My Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            View your upcoming and past appointments.
          </p>
        </div>
        <Button asChild>
            <Link href="/appointments">Book New Appointment</Link>
        </Button>
      </header>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {renderAppointmentGrid(upcomingAppointments, "You have no upcoming appointments scheduled.")}
        </TabsContent>
        <TabsContent value="all">
           {renderAppointmentGrid(patientAppointments, "You have no appointments scheduled.")}
        </TabsContent>
        <TabsContent value="past">
          {renderAppointmentGrid(pastAppointments, "You have no past appointment records.")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
