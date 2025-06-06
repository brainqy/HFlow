
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorAppointments as initialAppointments } from '@/lib/placeholder-data';
import type { DoctorAppointment } from '@/types';
import { CalendarCheck, Eye, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(initialAppointments);
  const { toast } = useToast();

  const getStatusBadgeVariant = (status: DoctorAppointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'default'; // Primary color
      case 'Checked-in': return 'secondary'; // A distinct color, maybe blueish or yellowish
      case 'Completed': return 'outline'; // Greenish often implies success/completion
      case 'Cancelled': return 'destructive';
      case 'Pending Confirmation': return 'outline'; // A neutral/pending color
      default: return 'outline';
    }
  };
  
  const getStatusBadgeClassName = (status: DoctorAppointment['status']) => {
    if (status === 'Completed') return 'border-green-500 text-green-600 bg-green-500/10';
    if (status === 'Checked-in') return 'border-yellow-500 text-yellow-600 bg-yellow-500/10';
    return '';
  }

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
          <CardTitle className="font-headline text-xl">Appointment Schedule</CardTitle>
          <CardDescription>
            A list of your upcoming and past appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead> 
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusBadgeVariant(appointment.status)}
                        className={getStatusBadgeClassName(appointment.status)}
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {(appointment.status === 'Scheduled' || appointment.status === 'Checked-in') && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMarkAsCompleted(appointment.id)}
                          className="border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-700"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" /> Mark Completed
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild className="opacity-50 cursor-not-allowed">
                        <Link href="#" className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> View Chart
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">You have no appointments scheduled.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
