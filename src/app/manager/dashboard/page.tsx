
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctorPatients, placeholderDoctors, placeholderDoctorAppointments } from '@/lib/placeholder-data'; // Assuming appointments can be counted here
import { Users, Stethoscope, CalendarCheck, AlertTriangle, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ManagerDashboardPage() {
  const managerName = "Manager"; // Placeholder
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const totalPatients = placeholderDoctorPatients.length; // Using doctor patients as a proxy for total patients
  const totalDoctors = placeholderDoctors.length;
  const totalAppointments = placeholderDoctorAppointments.length; // Placeholder, ideally fetched/calculated differently

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Manager Dashboard</h1>
          <p className="text-muted-foreground">Overview for {todayFormatted}. Welcome, {managerName}!</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/manager/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> System Settings
          </Link>
        </Button>
      </header>

      {/* Quick Stats/Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <Link href="/manager/users?role=patient" className="text-xs text-primary hover:underline">View Patients</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <Link href="/manager/users?role=doctor" className="text-xs text-primary hover:underline">View Doctors</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">(Placeholder: all time)</p>
          </CardContent>
        </Card>
         <Card className="shadow-md bg-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">System Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div> {/* Placeholder */}
            <p className="text-xs text-muted-foreground">No critical alerts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
             <CardDescription>Overview of recent system events (Placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
                <li>New patient registered: John B.</li>
                <li>Doctor Eleanor Vance updated profile.</li>
                <li>Appointment scheduled for Alice W.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Quick Links</CardTitle>
            <CardDescription>Common management tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full" asChild><Link href="/manager/users">Manage Users</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link href="/manager/settings">Manage Clinic Settings</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link href="/manager/reports">View Reports</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
