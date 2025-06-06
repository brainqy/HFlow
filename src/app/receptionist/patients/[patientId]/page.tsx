
import { placeholderDoctorPatients, placeholderDoctorAppointments } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CalendarDays, Phone, Mail, Home, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  // Use a smaller set or a specific list if placeholderDoctorPatients is very large
  return placeholderDoctorPatients.slice(0, 10).map((patient) => ({ // Limiting for build time
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

  // Simulate more detailed (but non-sensitive) patient data
  const patientDetails = {
    dob: new Date(new Date(patient.lastVisit).setFullYear(new Date(patient.lastVisit).getFullYear() - 30)).toLocaleDateString(), // Placeholder
    gender: "Female", // Placeholder
    phone: `(555) 123-${Math.floor(Math.random() * 9000) + 1000}`,
    email: patient.email || `${patient.name.toLowerCase().replace(' ', '.')}@example.com`,
    address: `${Math.floor(Math.random() * 900) + 100} Main St, Anytown, CA 90210`, // Placeholder
    insuranceProvider: "MediCare Plus", // Placeholder
    insurancePolicyNumber: `XYZ${Math.floor(Math.random() * 900000) + 100000}`, // Placeholder
  };

  const patientAppointments = placeholderDoctorAppointments.filter(
    appt => appt.patientName === patient.name && new Date(appt.date) >= new Date()
  ).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
        <Button variant="outline" className="opacity-50 cursor-not-allowed">Edit Patient Info</Button>
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
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> <strong>Phone:</strong> {patientDetails.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> <strong>Email:</strong> {patientDetails.email}</p>
                    <p className="flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> <strong>Address:</strong> {patientDetails.address}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Insurance Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                     <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /> <strong>Provider:</strong> {patientDetails.insuranceProvider}</p>
                     <p className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> <strong>Policy #:</strong> {patientDetails.insurancePolicyNumber}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    {patientAppointments.length > 0 ? (
                        <ul className="space-y-3">
                        {patientAppointments.map((appt) => (
                            <li key={appt.id} className="p-3 border rounded-md bg-muted/30">
                            <p className="font-semibold">{new Date(appt.date).toLocaleDateString()} at {appt.time}</p>
                            <p className="text-sm text-muted-foreground">With Dr. Placeholder for: {appt.reason}</p>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No upcoming appointments scheduled.</p>
                    )}
                    <Button asChild className="mt-4 w-full">
                        <Link href={`/receptionist/appointments?patientId=${patient.id}`}>Schedule New Appointment</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
