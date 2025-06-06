
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorPatients } from '@/lib/placeholder-data'; 
import type { DoctorPatient } from '@/types';
import { Users, Eye, Edit3, UserPlus, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import React, { useState, useMemo } from 'react';

export default function ReceptionistPatientDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return placeholderDoctorPatients;
    }
    return placeholderDoctorPatients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (patient.phone && patient.phone.includes(searchTerm))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <Users className="h-8 w-8" /> Patient Directory
            </h1>
            <p className="text-muted-foreground mt-1">
            Search, view, and manage patient records.
            </p>
        </div>
        <Button asChild>
            <Link href="/receptionist/register-patient">
                <UserPlus className="mr-2 h-4 w-4" /> Register New Patient
            </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Patient List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, email, or phone..." 
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          {filteredPatients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{patient.phone || 'N/A'}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.email || 'N/A'}</TableCell>
                    <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/receptionist/patients/${patient.id}`} className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> View
                        </Link>
                      </Button>
                       <Button variant="ghost" size="icon" className="hover:text-yellow-500 opacity-50 cursor-not-allowed">
                        <Edit3 className="h-4 w-4" /> <span className="sr-only">Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
