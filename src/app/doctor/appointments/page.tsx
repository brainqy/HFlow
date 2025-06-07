
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import type { DateRange } from 'react-day-picker';
import { placeholderDoctorAppointments as initialAppointments } from '@/lib/placeholder-data';
import type { DoctorAppointment } from '@/types';
import { CalendarCheck, Eye, CheckCircle, Filter, User, CalendarDays, Clock, FileText as ReasonIcon, XCircle, RotateCcw as RescheduleIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

const appointmentStatuses = ['Scheduled', 'Checked-in', 'Completed', 'Cancelled', 'Pending Confirmation'] as const;

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(initialAppointments);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const patientQuery = searchParams.get('patientName');
    if (patientQuery) {
      setSearchTerm(decodeURIComponent(patientQuery));
    }
  }, [searchParams]);

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

  const handleMarkAsCompleted = (appointmentId: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === appointmentId ? { ...appt, status: 'Completed' as const } : appt
      )
    );
    const patientName = appointments.find(a => a.id === appointmentId)?.patientName;
    toast({
      title: "Appointment Completed",
      description: `Appointment with ${patientName || 'Patient'} marked as completed.`,
    });
  };

  const handleMockAction = (action: string, patientName?: string) => {
    toast({
      title: `${action} Requested`,
      description: `${action} for ${patientName || 'Patient'} has been noted (prototype action).`,
    });
  };

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(appt => {
        const searchTermLower = searchTerm.toLowerCase();
        return appt.patientName.toLowerCase().includes(searchTermLower);
      })
      .filter(appt => {
        if (!dateRange?.from) return true;
        const apptDate = new Date(appt.date);
        apptDate.setHours(0,0,0,0); 
        
        let fromDate = new Date(dateRange.from);
        fromDate.setHours(0,0,0,0); 

        if (!dateRange.to) return apptDate.getTime() === fromDate.getTime();
        
        let toDate = new Date(dateRange.to);
        toDate.setHours(0,0,0,0); 

        return apptDate >= fromDate && apptDate <= toDate;
      })
      .filter(appt => statusFilter === 'all' || appt.status === statusFilter)
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time));
  }, [appointments, searchTerm, dateRange, statusFilter]);


  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <CalendarCheck className="h-8 w-8" /> My Appointments
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your scheduled appointments.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Filter className="h-5 w-5"/> Filter Appointments</CardTitle>
          <CardDescription>Refine your view of the appointment schedule.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input 
              placeholder="Search by patient name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lg:col-span-1"
            />
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {appointmentStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </CardContent>
      </Card>

      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
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
                {(appointment.status === 'Scheduled' || appointment.status === 'Checked-in' || appointment.status === 'Pending Confirmation') && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMarkAsCompleted(appointment.id)}
                      className="border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-700"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Mark Completed
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-500/10 hover:text-amber-700" onClick={() => handleMockAction('Reschedule', appointment.patientName)}>
                        <RescheduleIcon className="mr-1 h-3 w-3" /> Reschedule
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-red-500/10 hover:text-red-700" onClick={() => handleMockAction('Cancellation', appointment.patientName)}>
                        <XCircle className="mr-1 h-3 w-3" /> Cancel
                    </Button>
                  </>
                )}
                 <Button variant="outline" size="sm" asChild>
                  <Link href={`/doctor/patients/${appointment.patientId}/chart`} className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> View Chart
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center py-8">No appointments found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
