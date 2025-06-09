
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, Stethoscope, CheckCircle, Info, Filter as FilterIcon, RotateCcw, RefreshCcw as RescheduleIcon, PlaySquare, Ticket } from 'lucide-react';
import { allClinicAppointments, placeholderDoctors } from '@/lib/placeholder-data';
import type { DoctorAppointment } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

type AppointmentStatus = DoctorAppointment['status'];

export default function PatientAppointmentsPage() {
  const patientName = "Jane Doe (Patient Portal User)";
  const { toast } = useToast();

  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(undefined);
  const [currentAppointments, setCurrentAppointments] = useState<DoctorAppointment[]>([]);

  useEffect(() => {
    // Simulate fetching/observing the shared allClinicAppointments for mutations
    setCurrentAppointments(JSON.parse(JSON.stringify(allClinicAppointments))); 
  }, []);

  const patientAppointments = useMemo(() => {
    return currentAppointments
      .filter(appt => appt.patientName === patientName)
      .filter(appt => doctorFilter === 'all' || appt.doctorId === doctorFilter)
      .filter(appt => {
        if (!dateFilter?.from) return true;
        const apptDate = new Date(appt.date);
        apptDate.setHours(0,0,0,0);
        
        let fromDate = new Date(dateFilter.from);
        fromDate.setHours(0,0,0,0);

        if (!dateFilter.to) return apptDate.getTime() === fromDate.getTime();
        
        let toDate = new Date(dateFilter.to);
        toDate.setHours(0,0,0,0);

        return apptDate >= fromDate && apptDate <= toDate;
      })
      .sort((a, b) => {
        const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateComparison !== 0) return dateComparison;
        if (a.ticketNumber && b.ticketNumber) return a.ticketNumber - b.ticketNumber;
        return b.time.localeCompare(a.time);
      });
  }, [currentAppointments, patientName, doctorFilter, dateFilter]);

  const upcomingAppointments = useMemo(() => {
    return patientAppointments
      .filter(appt => new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0)) && appt.status !== 'Cancelled' && appt.status !== 'Completed')
      .sort((a,b) => {
        const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateComparison !== 0) return dateComparison;
        if (a.ticketNumber && b.ticketNumber) return a.ticketNumber - b.ticketNumber;
        return a.time.localeCompare(b.time);
      });
  }, [patientAppointments]);

  const pastAppointments = useMemo(() => {
    return patientAppointments
      .filter(appt => new Date(appt.date) < new Date(new Date().setHours(0,0,0,0)) || appt.status === 'Cancelled' || appt.status === 'Completed');
  }, [patientAppointments]);

  const clearFilters = () => {
    setDoctorFilter('all');
    setDateFilter(undefined);
  };

  const handleRequestReschedule = (appointment: DoctorAppointment) => {
    toast({
      title: "Reschedule Request Submitted",
      description: `Your request to reschedule the appointment with ${appointment.doctorName} on ${format(new Date(appointment.date), "PPP")} has been submitted. We will contact you to confirm a new time.`,
    });
  };

  const getStatusBadgeVariant = (status: AppointmentStatus) => {
    switch (status) {
      case 'Scheduled': return 'default';
      case 'Checked-in': return 'secondary';
      case 'In Consultation': return 'default';
      case 'Completed': return 'outline';
      case 'Cancelled': return 'destructive';
      case 'Pending Confirmation': return 'outline';
      default: return 'outline';
    }
  };
  
  const getStatusBadgeClassName = (status: AppointmentStatus) => {
    if (status === 'Completed') return 'border-green-500 text-green-600 bg-green-500/10';
    if (status === 'Checked-in') return 'border-yellow-500 text-yellow-600 bg-yellow-500/10';
    if (status === 'Pending Confirmation') return 'border-blue-500 text-blue-600 bg-blue-500/10';
    if (status === 'In Consultation') return 'border-purple-500 text-purple-600 bg-purple-500/10';
    return '';
  };

  const AppointmentCard = ({ appointment }: { appointment: DoctorAppointment }) => {
    const doctor = placeholderDoctors.find(d => d.id === appointment.doctorId);
    const canReschedule = (appointment.status === 'Scheduled' || appointment.status === 'Pending Confirmation') && new Date(appointment.date) >= new Date(new Date().setHours(0,0,0,0));

    return (
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" /> 
              {appointment.doctorName}
            </CardTitle>
            {appointment.ticketNumber && (appointment.status === 'Checked-in' || appointment.status === 'In Consultation') && (
              <Badge variant="outline" className="text-sm flex items-center gap-1">
                  <Ticket className="h-4 w-4"/> #{appointment.ticketNumber}
              </Badge>
            )}
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
           <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Status:</span>
            <Badge 
                variant={getStatusBadgeVariant(appointment.status)}
                className={getStatusBadgeClassName(appointment.status)}
            >
                {appointment.status}
            </Badge>
          </div>
          {appointment.reminderSent && (
            <p className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle className="h-3 w-3"/> Reminder Sent
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {canReschedule && (
            <Button variant="outline" size="sm" onClick={() => handleRequestReschedule(appointment)}>
              <RescheduleIcon className="mr-1 h-3 w-3" /> Request Reschedule
            </Button>
          )}
          <Button variant="link" size="sm" asChild className="p-0">
            <Link href={`/doctors/${appointment.doctorId}`}>View Doctor Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderAppointmentGrid = (appointmentsToRender: DoctorAppointment[], emptyMessage: string) => {
    if (appointmentsToRender.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center py-8">{emptyMessage}</p>
          </CardContent>
        </Card>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentsToRender.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)}
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
            View and filter your upcoming and past appointments.
          </p>
        </div>
        <Button asChild>
            <Link href="/appointments">Book New Appointment</Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2"><FilterIcon className="h-5 w-5 text-primary" /> Filter Appointments</CardTitle>
            <CardDescription>Refine your view by doctor or date range.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-1">
                <label htmlFor="doctorFilter" className="block text-sm font-medium text-foreground mb-1">Doctor</label>
                <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger id="doctorFilter"><SelectValue placeholder="Filter by doctor" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {placeholderDoctors.map(doc => (
                        <SelectItem key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="lg:col-span-1">
                 <label className="block text-sm font-medium text-foreground mb-1">Date Range</label>
                <DatePickerWithRange date={dateFilter} onDateChange={setDateFilter} />
            </div>
            <Button onClick={clearFilters} variant="outline" className="w-full sm:w-auto lg:self-end">
              <RotateCcw className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {renderAppointmentGrid(upcomingAppointments, "You have no upcoming appointments matching your filters.")}
        </TabsContent>
        <TabsContent value="all">
           {renderAppointmentGrid(patientAppointments, "You have no appointments matching your filters.")}
        </TabsContent>
        <TabsContent value="past">
          {renderAppointmentGrid(pastAppointments, "You have no past appointment records matching your filters.")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
