
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, ListFilter, UserCheck, SendToBack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderNursePatientQueue } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { NursePatientQueueItem } from '@/types';

export default function NursePatientQueuePage() {
  const { toast } = useToast();
  const [patientQueue, setPatientQueue] = useState<NursePatientQueueItem[]>(placeholderNursePatientQueue);

  const handleStatusChange = (patientId: string, newStatus: NursePatientQueueItem['status']) => {
    const updatedQueue = patientQueue.map(p => p.id === patientId ? { ...p, status: newStatus } : p);
    setPatientQueue(updatedQueue);
    // For prototype, also update the global placeholder array if you want changes to persist across page reloads (not ideal for real apps)
    const globalIndex = placeholderNursePatientQueue.findIndex(p => p.id === patientId);
    if (globalIndex !== -1) {
        placeholderNursePatientQueue[globalIndex].status = newStatus;
    }
    toast({
      title: "Patient Status Updated",
      description: `${patientQueue.find(p=>p.id === patientId)?.name || 'Patient'}'s status changed to ${newStatus}.`
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UsersRound className="h-8 w-8" /> Patient Queue
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and view patients waiting for care.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="font-headline text-xl">Current Queue</CardTitle>
              <CardDescription>
                Patients awaiting triage, vitals, or doctor consultation.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Input placeholder="Search patients..." className="max-w-sm flex-grow md:flex-grow-0" />
              <Button variant="outline" size="icon">
                <ListFilter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {patientQueue.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Arrival Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientQueue.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.arrivalTime}</TableCell>
                    <TableCell>
                       <Badge 
                        variant={
                            patient.status === 'Waiting for Triage' ? 'destructive' : 
                            patient.status === 'Ready for Vitals' ? 'secondary' : 
                            patient.status === 'Waiting for Doctor' ? 'default' :
                            patient.status === 'With Doctor' ? 'outline' : // Neutral for "With Doctor"
                            'outline'
                        }
                        className={`capitalize ${patient.status === 'With Doctor' ? 'border-blue-500 text-blue-600 bg-blue-500/10' : ''}`}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        {/* This would link to a patient chart view, possibly a simplified one for nurses */}
                        <Link href="#">View Chart</Link>
                      </Button>
                      {patient.status === 'Ready for Vitals' && (
                        <Button size="sm" asChild>
                           <Link href="/nurse/vitals-entry">Record Vitals</Link>
                        </Button>
                      )}
                       {(patient.status === 'Ready for Vitals' || patient.status === 'Waiting for Doctor') && (
                        <Button size="sm" variant="secondary" onClick={() => handleStatusChange(patient.id, 'With Doctor')}>
                           <SendToBack className="mr-1 h-3 w-3"/> Send to Doctor
                        </Button>
                      )}
                      {patient.status === 'Waiting for Triage' && (
                        <Button size="sm" variant="secondary" onClick={() => handleStatusChange(patient.id, 'Ready for Vitals')}>
                          <UserCheck className="mr-1 h-3 w-3"/> Start Triage
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">Patient queue is currently empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
