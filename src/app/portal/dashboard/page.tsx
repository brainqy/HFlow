
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, FileText, Pill, UserCircle, Bell, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderDoctorAppointments, placeholderDoctors } from '@/lib/placeholder-data'; 
import { format } from 'date-fns';

export default function PortalDashboardPage() {
  const patientName = "Jane Doe (Patient Portal User)"; // Placeholder to match data
  
  const upcomingAppointments = placeholderDoctorAppointments
    .filter(appt => appt.patientName === patientName && new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time.localeCompare(b.time))
    .slice(0, 3); 

  const recentActivity = [
    { id: '1', description: 'New lab results available for blood test.', date: '2024-07-20', type: 'lab' },
    { id: '2', description: 'Medication refill for Lisinopril processed.', date: '2024-07-18', type: 'medication' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {patientName.split('(')[0].trim()}!</h1>
          <p className="text-muted-foreground">Here's a quick overview of your health portal.</p>
        </div>
        <Button asChild>
          <Link href="/portal/profile" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" /> View Profile
          </Link>
        </Button>
      </header>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {[
          { title: 'Medical History', href: '/portal/medical-history', icon: FileText, description: 'View your diagnoses, procedures, and notes.' },
          { title: 'Medications', href: '/portal/medications', icon: Pill, description: 'Manage your prescriptions and refills.' },
          { title: 'My Appointments', href: '/portal/appointments', icon: CalendarDays, description: 'View all your appointments.' },
        ].map(item => (
          <Card key={item.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium font-headline">{item.title}</CardTitle>
              <item.icon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <Button variant="outline" asChild className="w-full">
                <Link href={item.href}>Go to {item.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" /> Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appt => (
                <div key={appt.id} className="mb-4 p-3 border rounded-md bg-primary/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">{appt.doctorName} <span className="text-sm text-muted-foreground">({placeholderDoctors.find(d => d.id === appt.doctorId)?.specialty || 'Specialist'})</span></p>
                      <p className="text-sm text-muted-foreground">{format(new Date(appt.date), "EEEE, MMM d, yyyy")} at {appt.time}</p>
                    </div>
                    {appt.reminderSent && (
                      <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" /> Reminder Sent
                      </div>
                    )}
                  </div>
                   <p className="text-sm text-muted-foreground mt-1">Reason: {appt.reason}</p>
                  <div className="mt-2">
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary opacity-50 cursor-not-allowed">View Details</Button>
                    <Button variant="link" size="sm" className="p-0 h-auto text-amber-600 ml-2 opacity-50 cursor-not-allowed">Reschedule</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">You have no upcoming appointments.</p>
            )}
             <div className="mt-4 space-y-2">
              <Button asChild className="w-full">
                <Link href="/portal/appointments">View All Appointments</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                 <Link href="/appointments">Schedule New Appointment</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity / Notifications */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {recentActivity.map(activity => (
                  <li key={activity.id} className="flex items-start gap-3 text-sm pb-3 border-b last:border-b-0">
                    <div className={`p-1.5 rounded-full mt-1 ${activity.type === 'lab' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {activity.type === 'lab' ? <FileText className="h-4 w-4" /> : <Pill className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No recent activity.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Tips Section */}
       <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Image src="https://placehold.co/150x150.png" alt="Health Tip" data-ai-hint="healthy lifestyle" width={120} height={120} className="rounded-lg object-cover" />
          <div>
            <h3 className="font-headline text-xl font-semibold text-foreground mb-2">Quick Health Tip</h3>
            <p className="text-muted-foreground mb-3">
              Stay hydrated! Drinking enough water throughout the day can boost your energy levels and improve overall health. Aim for at least 8 glasses daily.
            </p>
            <Button variant="link" asChild className="p-0 text-primary">
              <Link href="/blog">More Health Articles</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
