
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarClock, Check, X, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderNurseSchedule } from '@/lib/placeholder-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from "@/hooks/use-toast";

// Dummy data for upcoming shifts for demonstration
const upcomingShifts = [
  { date: '2024-08-16', time: '08:00 AM - 04:00 PM', role: 'Floor Nurse', unit: 'General Ward' },
  { date: '2024-08-17', time: '12:00 PM - 08:00 PM', role: 'Triage Nurse', unit: 'Emergency Dept.' },
  { date: '2024-08-19', time: '08:00 AM - 04:00 PM', role: 'Floor Nurse', unit: 'Pediatrics' },
  { date: '2024-08-20', time: 'Day Off', role: '', unit: '' },
  { date: '2024-08-21', time: '07:00 AM - 07:00 PM', role: 'Staff Nurse', unit: 'ICU' },
];


export default function NurseSchedulePage() {
  const { toast } = useToast();
  const today = new Date();
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  const handleRequestTimeOff = () => {
    toast({
      title: "Time Off Request Submitted",
      description: "Your time off request has been submitted for approval (mocked).",
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <CalendarClock className="h-8 w-8" /> My Schedule
        </h1>
        <p className="text-muted-foreground mt-1">
          View your upcoming shifts and manage time-off requests.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-lg md:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Today's Shift</CardTitle>
            <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">{placeholderNurseSchedule.today.split('(')[0].trim()}</p>
            <p className="text-muted-foreground">{placeholderNurseSchedule.today.split('(')[1]?.replace(')','') || 'Regular Shift'}</p>
            {placeholderNurseSchedule.notes && (
              <div className="mt-4 p-3 bg-primary/10 rounded-md">
                <p className="text-sm font-semibold text-primary">Shift Notes:</p>
                <p className="text-sm text-primary/80">{placeholderNurseSchedule.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Upcoming Shifts</CardTitle>
            <CardDescription>Your schedule for the next few days.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {upcomingShifts.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Unit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {upcomingShifts.map(shift => (
                        <TableRow key={shift.date + shift.time}>
                            <TableCell className="font-medium">{formatDate(shift.date)}</TableCell>
                            <TableCell>{shift.time}</TableCell>
                            <TableCell>{shift.role || '-'}</TableCell>
                            <TableCell>{shift.unit || '-'}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-muted-foreground text-center py-4">No upcoming shifts scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl">Time Off Requests</CardTitle>
            <CardDescription>Manage your leave requests.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for time off requests list or form */}
            <p className="text-muted-foreground">No pending time off requests.</p>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button onClick={handleRequestTimeOff}><PlusCircle className="mr-2 h-4 w-4"/>Request Time Off</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
