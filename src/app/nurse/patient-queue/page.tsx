
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderNursePatientQueue } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

export default function NursePatientQueuePage() {
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
            <div className="flex items-center gap-2">
              <Input placeholder="Search patients..." className="max-w-sm" />
              <Button variant="outline" size="icon">
                <ListFilter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {placeholderNursePatientQueue.length > 0 ? (
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
                {placeholderNursePatientQueue.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.arrivalTime}</TableCell>
                    <TableCell>
                       <Badge 
                        variant={patient.status === 'Waiting for Triage' ? 'destructive' : patient.status === 'Ready for Vitals' ? 'secondary' : 'default'}
                        className="capitalize"
                      >
                        {patient.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">View Chart</Button>
                      {patient.status === 'Ready for Vitals' && <Button size="sm">Record Vitals</Button>}
                      {patient.status === 'Waiting for Triage' && <Button size="sm" variant="secondary">Triage</Button>}
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
      <p className="text-sm text-muted-foreground text-center">
        This is a placeholder page. Full patient queue management functionality will be implemented here.
      </p>
    </div>
  );
}
