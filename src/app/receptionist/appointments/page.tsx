
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { allClinicAppointments, placeholderDoctors } from '@/lib/placeholder-data'; 
import type { DoctorAppointment } from '@/types';
import { CalendarPlus, Eye, Edit, Trash2, Filter, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const appointmentStatuses = ['Scheduled', 'Checked-in', 'Completed', 'Cancelled', 'Pending Confirmation'] as const;


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
        apptDate.setHours(0,0,0,0); // Normalize apptDate to start of day for comparison
        
        let fromDate = new Date(dateRange.from);
        fromDate.setHours(0,0,0,0); // Normalize fromDate

        if (!dateRange.to) return apptDate.getTime() === fromDate.getTime();
        
        let toDate = new Date(dateRange.to);
        toDate.setHours(0,0,0,0); // Normalize toDate

        return apptDate >= fromDate && apptDate <= toDate;
      })
      .filter(appt => doctorFilter === 'all' || appt.doctorId === doctorFilter)
      .filter(appt => statusFilter === 'all' || appt.status === statusFilter);
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
  
  const getStatusBadgeVariant = (status: DoctorAppointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'default';
      case 'Checked-in': return 'secondary'; // Or a custom variant like 'info' if you add one
      case 'Completed': return 'outline';
      case 'Cancelled': return 'destructive';
      case 'Pending Confirmation': return 'outline'; // Could be 'warning'
      default: return 'outline';
    }
  };


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
          <CardTitle className="font-headline text-xl">Full Appointment Schedule</CardTitle>
          <CardDescription>Filter and manage all upcoming and past appointments.</CardDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <Input 
              placeholder="Search patient or doctor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          </div>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="hidden md:table-cell">Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{appointment.doctorName}</TableCell>
                    <TableCell>{format(new Date(appointment.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{appointment.reason}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {appointment.status === 'Scheduled' && (
                        <Button variant="outline" size="sm" onClick={() => handleCheckIn(appointment.id)}>
                          <CheckSquare className="mr-1 h-3 w-3" /> Check-in
                        </Button>
                      )}
                       <Button variant="ghost" size="icon" className="hover:text-yellow-500 opacity-50 cursor-not-allowed">
                        <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                      </Button>
                      {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                        <Button variant="ghost" size="icon" className="hover:text-destructive opacity-50 cursor-not-allowed">
                            <Trash2 className="h-4 w-4" /> <span className="sr-only">Cancel</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No appointments found matching your criteria.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
