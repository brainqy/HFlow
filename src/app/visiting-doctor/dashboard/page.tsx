
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allClinicAppointments, placeholderDoctorPatients, placeholderVisitingDoctors } from '@/lib/placeholder-data';
import { CalendarCheck, Users, Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import PortalAnnouncements from '@/components/sections/PortalAnnouncements';
import { format } from 'date-fns';

export default function VisitingDoctorDashboardPage() {
  // For prototype, assume a logged-in visiting doctor. Hardcode ID for data filtering.
  const visitingDoctorId = "visiting-doc-1"; 
  const visitingDoctorProfile = placeholderVisitingDoctors.find(vd => vd.id === visitingDoctorId);
  const doctorName = visitingDoctorProfile?.name || "Visiting Doctor";
  
  const todayISO = new Date().toISOString().split('T')[0];
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const todaysAppointments = allClinicAppointments.filter(a => a.doctorId === visitingDoctorId && a.date === todayISO);
  const assignedPatientsCount = placeholderDoctorPatients.filter(p => p.assignedVisitingDoctorId === visitingDoctorId).length;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {doctorName}!</h1>
          <p className="text-muted-foreground">Your Visiting Doctor dashboard for {todayFormatted}.</p>
          {visitingDoctorProfile?.assignmentPeriod && <p className="text-sm text-muted-foreground">Assignment: {visitingDoctorProfile.assignmentPeriod}</p>}
        </div>
        <Button asChild variant="outline">
          <Link href="/visiting-doctor/profile" className="flex items-center gap-2">
            My Profile
          </Link>
        </Button>
      </header>
      
      <PortalAnnouncements portalType="visiting_doctor_portal" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysAppointments.length}</div>
            <Link href="/visiting-doctor/schedule" className="text-xs text-primary hover:underline">View Today's Schedule</Link>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Patients</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedPatientsCount}</div>
             <Link href="/visiting-doctor/patients" className="text-xs text-primary hover:underline">View Assigned Patients</Link>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-primary" /> Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysAppointments.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {todaysAppointments.map(appt => (
                <div key={appt.id} className="p-3 border rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="flex justify-between items-center">
                      <div>
                          <p className="font-semibold text-foreground">{appt.patientName}</p>
                          <p className="text-sm text-muted-foreground">{format(new Date(appt.date), "MMM d")} at {appt.time}</p>
                      </div>
                      <Badge variant={appt.status === 'Checked-in' ? 'secondary' : 'default'}>{appt.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Reason: {appt.reason}</p>
                  <div className="mt-2">
                    <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary text-xs">
                      <Link href={`/visiting-doctor/patients/${appt.patientId}/chart`} className="flex items-center gap-1">
                         <Eye className="h-3 w-3" /> View Patient Chart
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No appointments scheduled for you today.</p>
          )}
          <Button asChild className="mt-4 w-full">
            <Link href="/visiting-doctor/schedule">View Full Schedule</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
