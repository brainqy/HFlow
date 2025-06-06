
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderNursePatientQueue, placeholderNurseAlerts, placeholderNurseSchedule } from '@/lib/placeholder-data';
import { UsersRound, ActivitySquare, TriangleAlert, CalendarClock, Syringe, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function NurseDashboardPage() {
  const nurseName = "Alex Miller"; // Placeholder
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, Nurse {nurseName}!</h1>
          <p className="text-muted-foreground">Overview for {today}.</p>
        </div>
         <Button asChild variant="outline">
          <Link href="/nurse/schedule" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> My Schedule
          </Link>
        </Button>
      </header>

      {/* Quick Stats/Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients in Queue</CardTitle>
            <UsersRound className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderNursePatientQueue.length}</div>
             <Button variant="link" asChild className="p-0 h-auto text-xs text-primary">
              <Link href="/nurse/patient-queue">View Queue</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Vitals</CardTitle>
            <ActivitySquare className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderNursePatientQueue.filter(p=> p.status === 'Ready for Vitals').length}</div>
             <Button variant="link" asChild className="p-0 h-auto text-xs text-primary">
              <Link href="/nurse/vitals-entry">Enter Vitals</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <TriangleAlert className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placeholderNurseAlerts.length}</div>
             <p className="text-xs text-muted-foreground">requiring attention</p>
          </CardContent>
        </Card>
         <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shift Status</CardTitle>
            <CalendarClock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-semibold">{placeholderNurseSchedule.today.split('(')[0].trim()}</div>
            <p className="text-xs text-muted-foreground">({placeholderNurseSchedule.today.split('(')[1]?.replace(')','') || 'Regular Shift'})</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Queue */}
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <UsersRound className="h-6 w-6 text-primary" /> Patient Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {placeholderNursePatientQueue.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {placeholderNursePatientQueue.map(patient => (
                  <div key={patient.id} className="p-3 border rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Arrived: {patient.arrivalTime}</p>
                      </div>
                      <Badge 
                        variant={patient.status === 'Waiting for Triage' ? 'destructive' : patient.status === 'Ready for Vitals' ? 'secondary' : 'default'}
                        className="capitalize"
                      >
                        {patient.status.toLowerCase()}
                      </Badge>
                    </div>
                     <div className="mt-2 space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">View Chart</Button>
                      {patient.status === 'Ready for Vitals' && <Button size="sm" className="text-xs">Record Vitals</Button>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Patient queue is currently empty.</p>
            )}
             <Button asChild className="mt-4 w-full">
              <Link href="/nurse/patient-queue">Manage Full Queue</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Nurse Actions */}
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                       <Syringe className="h-6 w-6 text-primary" /> Quick Tasks
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="default" className="w-full">Administer Medication</Button>
                    <Button variant="outline" className="w-full">Check Supplies</Button>
                    <Button variant="outline" className="w-full">Log Incident</Button>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                       <ClipboardList className="h-6 w-6 text-primary" /> Shift Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{placeholderNurseSchedule.notes || "No specific notes for this shift."}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
