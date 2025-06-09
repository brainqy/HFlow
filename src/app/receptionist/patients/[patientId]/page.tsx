
import { placeholderDoctorPatients, allClinicAppointments } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CalendarDays, Phone, Mail, Home, Briefcase, FileText, CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { DoctorAppointment } from '@/types';

export async function generateStaticParams() {
  return placeholderDoctorPatients.slice(0, 10).map((patient) => ({ 
    patientId: patient.id,
  }));
}

export default function ReceptionistPatientViewPage({ params }: { params: { patientId: string } }) {
  const patient = placeholderDoctorPatients.find((p) => p.id === params.patientId);

  if (!patient) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-muted-foreground">Patient not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/receptionist/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient Directory
          </Link>
        </Button>
      </div>
    );
  }

  const patientDetails = {
    dob: "January 1, 1980 (Placeholder)", 
    gender: "Female (Placeholder)", 
    address: `${Math.floor(Math.random() * 900) + 100} Main St, Anytown, CA 90210 (Placeholder)`, 
    insuranceProvider: "MediCare Plus (Placeholder)", 
    insurancePolicyNumber: `XYZ${Math.floor(Math.random() * 900000) + 100000} (Placeholder)`, 
  };

  const patientAppointments = allClinicAppointments.filter(
    appt => appt.patientName === patient.name 
  ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time)); // Sort desc by date

  const upcomingAppointments = patientAppointments.filter(appt => new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0))).reverse(); // then reverse for upcoming chronological
  const pastAppointments = patientAppointments.filter(appt => new Date(appt.date) < new Date(new Date().setHours(0,0,0,0))).slice(0, 3); // Show last 3 past

  const renderAppointmentList = (appointments: DoctorAppointment[], title: string) => {
    if (appointments.length === 0) {
        return <p className="text-sm text-muted-foreground italic">No {title.toLowerCase()} recorded.</p>;
    }
    return (
        <ul className="space-y-3">
            {appointments.map((appt) => (
                <li key={appt.id} className="p-3 border rounded-md bg-muted/30">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-foreground">{new Date(appt.date).toLocaleDateString()} at {appt.time}</p>
                            <p className="text-sm text-muted-foreground">With: {appt.doctorName}</p>
                        </div>
                        <Badge variant={appt.status === "Completed" || new Date(appt.date) < new Date() ? "outline" : "default"}>{appt.status}</Badge>
                    </div>
                    <p className="text-sm text-foreground mt-1">Reason: {appt.reason}</p>
                </li>
            ))}
        </ul>
    );
  };

  const appointmentLink = `/appointments?patientId=${patient.id}&patientName=${encodeURIComponent(patient.name)}&patientEmail=${encodeURIComponent(patient.email || '')}&patientPhone=${encodeURIComponent(patient.phone || '')}`;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/receptionist/patients" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Directory
            </Link>
          </Button>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <User className="h-8 w-8" /> Patient: {patient.name}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="opacity-50 cursor-not-allowed">Edit Patient Info</Button>
            <Button asChild>
              <Link href={appointmentLink} className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" /> Create Appointment
              </Link>
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> <strong>Name:</strong> {patient.name}</p>
                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted-foreground" /> <strong>DOB:</strong> {patientDetails.dob}</p>
                    <p className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> <strong>Gender:</strong> {patientDetails.gender}</p>
                     <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> <strong>Email:</strong> {patient.email || 'N/A'}</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> <strong>Phone:</strong> {patient.phone || 'N/A'}</p>
                    <p className="flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> <strong>Address:</strong> {patientDetails.address}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Insurance Details (Placeholder)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                     <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /> <strong>Provider:</strong> {patientDetails.insuranceProvider}</p>
                     <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> <strong>Policy #:</strong> {patientDetails.insurancePolicyNumber}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Appointment History</CardTitle>
                    <CardDescription>Recent and upcoming appointments for {patient.name}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
                    <div>
                        <h3 className="text-md font-semibold mb-2 text-primary">Upcoming Appointments</h3>
                        {renderAppointmentList(upcomingAppointments, "Upcoming Appointments")}
                    </div>
                    <div className="pt-3 border-t mt-4">
                        <h3 className="text-md font-semibold mb-2 text-primary">Recent Past Appointments (Last 3)</h3>
                        {renderAppointmentList(pastAppointments, "Recent Past Appointments")}
                    </div>
                    <Button asChild className="mt-6 w-full">
                        <Link href={`/receptionist/appointments?patientName=${encodeURIComponent(patient.name)}`}>View Full Schedule / Book New</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
