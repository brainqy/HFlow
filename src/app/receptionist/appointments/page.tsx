
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorAppointments } from '@/lib/placeholder-data'; // Using existing data for now
import { CalendarPlus, Eye, Edit, Trash2, Filter } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import React from 'react';

export default function ReceptionistAppointmentsPage() {
  // For now, displaying all appointments. Filtering would be added later.
  const appointments = placeholderDoctorAppointments;

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
          <Link href="/appointments"> {/* Directs to the public booking form, can be changed to an internal scheduling form */}
            <CalendarPlus className="mr-2 h-4 w-4" /> Schedule New Appointment
          </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Full Appointment Schedule</CardTitle>
          <CardDescription>Filter and manage all upcoming and past appointments.</CardDescription>
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Input placeholder="Search by patient name or doctor..." className="max-w-sm" />
            <DatePickerWithRange />
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Doctor</TableHead>
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
                    <TableCell>Dr. Placeholder</TableCell> {/* Placeholder doctor */}
                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell className="max-w-xs truncate">{appointment.reason}</TableCell>
                    <TableCell>
                      <Badge variant={new Date(appointment.date) < new Date() ? "outline" : "default"}>
                        {new Date(appointment.date) < new Date() ? "Completed" : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary opacity-50 cursor-not-allowed">
                        <Eye className="h-4 w-4" /> <span className="sr-only">View Details</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-yellow-500 opacity-50 cursor-not-allowed">
                        <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive opacity-50 cursor-not-allowed">
                        <Trash2 className="h-4 w-4" /> <span className="sr-only">Cancel</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No appointments found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
