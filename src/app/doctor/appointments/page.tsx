
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderDoctorAppointments } from '@/lib/placeholder-data';
import { CalendarCheck, Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Added Badge for potential status display

export default function DoctorAppointmentsPage() {
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
          {placeholderDoctorAppointments.length > 0 ? (
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
                {placeholderDoctorAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      {/* Placeholder Status - can be expanded later */}
                      <Badge variant={new Date(appointment.date) < new Date() ? "outline" : "default"}>
                        {new Date(appointment.date) < new Date() ? "Completed" : "Upcoming"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        {/* Link to patient chart (assuming patientId is available or can be derived) */}
                        {/* For now, this is a placeholder as appointment data doesn't directly link to patientId for chart */}
                        <Link href="#" className="flex items-center gap-1 opacity-50 cursor-not-allowed">
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
