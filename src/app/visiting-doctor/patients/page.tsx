
"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorPatients, placeholderVisitingDoctors, allClinicAppointments } from '@/lib/placeholder-data';
import type { DoctorPatient } from '@/types';
import { Users, Eye, Search, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

export default function VisitingDoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // For prototype, assume a logged-in visiting doctor. Hardcode ID for data filtering.
  const visitingDoctorId = "visiting-doc-1"; 
  const visitingDoctorProfile = placeholderVisitingDoctors.find(vd => vd.id === visitingDoctorId);
  const doctorName = visitingDoctorProfile?.name || "Visiting Doctor";


  const assignedPatients = useMemo(() => {
    // For demo, filter patients specifically marked as assigned to this visiting doctor
    // or patients who have an appointment with this visiting doctor.
    const patientIdsFromAppointments = new Set(
      allClinicAppointments
        .filter(appt => appt.doctorId === visitingDoctorId)
        .map(appt => appt.patientId)
    );

    return placeholderDoctorPatients
      .filter(patient => 
        patient.assignedVisitingDoctorId === visitingDoctorId || 
        patientIdsFromAppointments.has(patient.id)
      )
      .filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm, visitingDoctorId]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <Users className="h-8 w-8" /> My Assigned Patients
        </h1>
        <p className="text-muted-foreground mt-1">
          Patients assigned to {doctorName} for the current period.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-xl">Patient List</CardTitle>
              <CardDescription>
                A list of your currently assigned patients.
              </CardDescription>
            </div>
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {assignedPatients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead>Last Visit (Overall)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.email || 'N/A'}</TableCell>
                    <TableCell className="hidden sm:table-cell">{patient.phone || 'N/A'}</TableCell>
                    <TableCell>{format(new Date(patient.lastVisit), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/visiting-doctor/patients/${patient.id}/chart`} className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> View Chart
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No patients found matching your criteria or currently assigned.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
