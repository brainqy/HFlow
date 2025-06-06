
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarClock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderNurseSchedule } from '@/lib/placeholder-data';

// Dummy data for upcoming shifts for demonstration
const upcomingShifts = [
  { date: '2024-08-16', time: '08:00 AM - 04:00 PM', role: 'Floor Nurse' },
  { date: '2024-08-17', time: '12:00 PM - 08:00 PM', role: 'Triage Nurse' },
  { date: '2024-08-19', time: '08:00 AM - 04:00 PM', role: 'Floor Nurse' },
  { date: '2024-08-20', time: 'Day Off', role: '' },
];


export default function NurseSchedulePage() {
  const today = new Date();
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

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

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Today's Shift</CardTitle>
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

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Upcoming Shifts</CardTitle>
            <CardDescription>Your schedule for the next few days.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-72 overflow-y-auto">
            <ul className="space-y-3">
            {upcomingShifts.map(shift => (
              <li key={shift.date} className="flex justify-between items-center p-3 border rounded-md bg-card hover:bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{formatDate(shift.date)}</p>
                  <p className="text-sm text-muted-foreground">{shift.time}</p>
                </div>
                <p className="text-sm text-primary font-semibold">{shift.role}</p>
              </li>
            ))}
            </ul>
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
        <CardFooter>
            <Button>Request Time Off</Button>
        </CardFooter>
      </Card>

      <p className="text-sm text-muted-foreground text-center">
        This is a placeholder page. Full schedule management and time-off request functionality will be implemented here.
      </p>
    </div>
  );
}
