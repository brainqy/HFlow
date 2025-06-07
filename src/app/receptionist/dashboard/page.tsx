
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctorAppointments } from '@/lib/placeholder-data'; // Using existing appointments for now
import { CalendarDays, UserPlus, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';

export default function ReceptionistDashboardPage() {
  const receptionistName = "Sarah Bell"; // Placeholder
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const todayISO = new Date().toISOString().split('T')[0];
  const todaysAppointmentsCount = placeholderDoctorAppointments.filter(a => a.date === todayISO).length;
  const patientsCheckedInToday = 5; // Placeholder
  const newRegistrationsToday = 2; // Placeholder

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {receptionistName}!</h1>
          <p className="text-muted-foreground">Front Desk Dashboard for {todayFormatted}.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/receptionist/profile">
            My Profile
          </Link>
        </Button>
      </header>

      <PortalAnnouncements portalType="receptionist_portal" />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointmentsCount}</div>
            <Link href="/receptionist/appointments" className="text-xs text-primary hover:underline">View Schedule</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Checked-In</CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientsCheckedInToday}</div>
            <p className="text-xs text-muted-foreground">(Today - Placeholder)</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            <UserPlus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newRegistrationsToday}</div>
             <Link href="/receptionist/register-patient" className="text-xs text-primary hover:underline">Register New Patient</Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/receptionist/appointments">Manage Appointments</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/receptionist/register-patient">Register New Patient</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/receptionist/patients">Search Patient Directory</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Upcoming Appointments (Next 5)</CardTitle>
            <CardDescription>A quick look at the next few scheduled visits.</CardDescription>
          </CardHeader>
          <CardContent>
            {placeholderDoctorAppointments.filter(a => new Date(a.date) >= new Date(todayISO)).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5).map(appt => (
              <div key={appt.id} className="py-2 border-b last:border-b-0">
                <p className="font-semibold text-foreground">{appt.patientName} - {appt.time}</p>
                <p className="text-sm text-muted-foreground">{new Date(appt.date).toLocaleDateString()} with Dr. Placeholder</p>
              </div>
            ))}
            {placeholderDoctorAppointments.filter(a => new Date(a.date) >= new Date(todayISO)).length === 0 && (
                <p className="text-muted-foreground text-sm">No upcoming appointments today.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
