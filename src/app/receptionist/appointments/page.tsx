
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { allClinicAppointments, placeholderDoctors } from '@/lib/placeholder-data'; 
import type { DoctorAppointment } from '@/types';
import { CalendarPlus, Eye, Edit, Trash2, Filter, CheckSquare, Send, User, Stethoscope as DoctorIcon, Clock, FileText as ReasonIcon, CalendarDays, PlaySquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const appointmentStatuses = ['Scheduled', 'Checked-in', 'In Consultation', 'Completed', 'Cancelled', 'Pending Confirmation'] as const;
type AppointmentStatus = (typeof appointmentStatuses)[number];


export default function ReceptionistAppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(allClinicAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(appt => {
        const searchTermLower = searchTerm.toLowerCase();
        return appt.patientName.toLowerCase().includes(searchTermLower) ||
               appt.doctorName.toLowerCase().includes(searchTermLower);
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
      .filter(appt => doctorFilter === 'all' || appt.doctorId === doctorFilter)
      .filter(appt => statusFilter === 'all' || appt.status === statusFilter)
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time)); 

  }, [appointments, searchTerm, dateRange, doctorFilter, statusFilter]);

  const handleCheckIn = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(appt => 
        appt.id === appointmentId ? { ...appt, status: 'Checked-in' } : appt
      )
    );
    const patientName = appointments.find(a => a.id === appointmentId)?.patientName;
    toast({
      title: "Patient Checked-in",
      description: `${patientName || 'Patient'} has been successfully checked-in.`,
    });
  };

  const handleSendReminder = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(appt => 
        appt.id === appointmentId ? { ...appt, reminderSent: true } : appt
      )
    );
    const patientName = appointments.find(a => a.id === appointmentId)?.patientName;
    toast({
      title: "Reminder Sent",
      description: `Appointment reminder sent to ${patientName || 'Patient'}.`,
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
  }


  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <CalendarPlus className="h-8 w-8" /> Manage Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            View, schedule, and manage all clinic appointments.
          </p>
        </div>
        <Button asChild>
          <Link href="/appointments"> 
            <CalendarPlus className="mr-2 h-4 w-4" /> Schedule New Appointment
          </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Filter className="h-5 w-5"/> Filter Appointments</CardTitle>
          <CardDescription>Refine your view of the appointment schedule.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input 
              placeholder="Search patient or doctor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lg:col-span-2"
            />
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger><SelectValue placeholder="Filter by doctor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {placeholderDoctors.map(doc => (
                  <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <CardDescription className="flex items-center gap-1 text-sm">
                  <DoctorIcon className="h-4 w-4" /> With {appointment.doctorName}
                </CardDescription>
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
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Reminder:</span>
                    <Badge variant={appointment.reminderSent ? 'default' : 'outline'} className={appointment.reminderSent ? 'bg-green-500 hover:bg-green-600' : ''}>
                        {appointment.reminderSent ? "Sent" : "Not Sent"}
                    </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-4 mt-auto">
                {appointment.status === 'Scheduled' && !appointment.reminderSent && (
                  <Button variant="outline" size="sm" onClick={() => handleSendReminder(appointment.id)}>
                    <Send className="mr-1 h-3 w-3" /> Send Reminder
                  </Button>
                )}
                {appointment.status === 'Scheduled' && (
                  <Button variant="default" size="sm" onClick={() => handleCheckIn(appointment.id)}>
                    <CheckSquare className="mr-1 h-3 w-3" /> Check-in
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 opacity-50 cursor-not-allowed">
                  <Edit className="mr-1 h-3 w-3" /> Edit
                </Button>
                {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-red-700 opacity-50 cursor-not-allowed">
                      <Trash2 className="mr-1 h-3 w-3" /> Cancel
                  </Button>
                )}
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

