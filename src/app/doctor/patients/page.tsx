
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorPatients, allClinicAppointments } from '@/lib/placeholder-data';
import type { DoctorPatient } from '@/types';
import { Users, Eye, CalendarDays, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

export default function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getNextAppointmentDate = (patientName: string) => {
    const upcomingAppointments = allClinicAppointments
      .filter(appt => appt.patientName === patientName && new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return upcomingAppointments.length > 0 ? format(new Date(upcomingAppointments[0].date), "MMM d, yyyy") : "N/A";
  };

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return placeholderDoctorPatients;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return placeholderDoctorPatients.filter((patient) =>
      patient.name.toLowerCase().includes(lowercasedFilter) ||
      (patient.email && patient.email.toLowerCase().includes(lowercasedFilter)) ||
      (patient.phone && patient.phone.includes(lowercasedFilter))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <Users className="h-8 w-8" /> My Patients
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and view details for patients under your care.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-xl">Patient List</CardTitle>
              <CardDescription>
                A list of your currently active patients.
              </CardDescription>
            </div>
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPatients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />Next Appointment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => {
                  const nextAppointmentDate = getNextAppointmentDate(patient.name);
                  return (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.email || 'N/A'}</TableCell>
                      <TableCell className="hidden sm:table-cell">{patient.phone || 'N/A'}</TableCell>
                      <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {nextAppointmentDate !== "N/A" ? (
                          <Link 
                            href={`/doctor/appointments?patientName=${encodeURIComponent(patient.name)}`} 
                            className="text-primary hover:underline"
                          >
                            {nextAppointmentDate}
                          </Link>
                        ) : (
                          nextAppointmentDate
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/doctor/patients/${patient.id}/chart`} className="flex items-center gap-1">
                            <Eye className="h-4 w-4" /> View Chart
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No patients found matching your criteria.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
