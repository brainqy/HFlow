
import { placeholderDoctorPatients, placeholderMedicalHistory, placeholderDoctorAppointments } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CalendarDays, Stethoscope, FileText, Pill, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { DoctorAppointment } from '@/types';

export async function generateStaticParams() {
  return placeholderDoctorPatients.map((patient) => ({
    patientId: patient.id,
  }));
}

const getIconForMedicalRecordType = (type: string) => {
  switch (type) {
    case 'diagnosis': return <Stethoscope className="h-4 w-4 text-red-500" />;
    case 'medication': return <Pill className="h-4 w-4 text-blue-500" />;
    case 'procedure': return <FileText className="h-4 w-4 text-green-500" />;
    case 'allergy': return <FileText className="h-4 w-4 text-orange-500" />; 
    default: return <FileText className="h-4 w-4 text-gray-500" />;
  }
};


export default function PatientChartPage({ params }: { params: { patientId: string } }) {
  const patient = placeholderDoctorPatients.find((p) => p.id === params.patientId);
  
  const patientHistory = placeholderMedicalHistory.filter((item, index) => index % placeholderDoctorPatients.length === placeholderDoctorPatients.findIndex(p => p.id === params.patientId) || item.doctor === "Dr. Eleanor Vance");
  
  const allPatientAppointments = placeholderDoctorAppointments
    .filter(appt => appt.patientName === patient?.name) // Matching by name due to placeholder data structure
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time)); // Sort by date desc, then time

  const upcomingAppointments = allPatientAppointments.filter(appt => new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0)));
  const pastAppointments = allPatientAppointments.filter(appt => new Date(appt.date) < new Date(new Date().setHours(0,0,0,0)));


  if (!patient) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-muted-foreground">Patient not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/doctor/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
          </Link>
        </Button>
      </div>
    );
  }

  const patientDetails = {
    dob: "1980-01-01", 
    gender: "Female", 
    contact: "555-0101", 
    emergencyContact: "Jane Doe (Spouse) - 555-0102" 
  }

  const renderAppointmentList = (appointments: DoctorAppointment[], title: string) => {
    if (appointments.length === 0) {
      return <p className="text-sm text-muted-foreground">No {title.toLowerCase()} found.</p>;
    }
    return (
      <div className="space-y-3">
        {appointments.map((appt) => (
          <div key={appt.id} className="p-3 border rounded-md bg-muted/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{new Date(appt.date).toLocaleDateString()} - {appt.time}</p>
                <p className="text-sm text-muted-foreground">With: {appt.doctorName}</p>
              </div>
              <Badge variant={appt.status === "Completed" || new Date(appt.date) < new Date() ? "outline" : "default"}>{appt.status}</Badge>
            </div>
            <p className="text-sm text-foreground mt-1">Reason: {appt.reason}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/doctor/patients" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Patient List
            </Link>
          </Button>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <User className="h-8 w-8" /> Patient Chart: {patient.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Viewing medical records and details for {patient.name}.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Patient Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Date of Birth:</strong> {new Date(patientDetails.dob).toLocaleDateString()}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Contact:</strong> {patientDetails.contact}</p>
                    <p><strong>Emergency Contact:</strong> {patientDetails.emergencyContact}</p>
                    <p><strong>Last Visit (Recorded):</strong> {new Date(patient.lastVisit).toLocaleDateString()}</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Recent Vitals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p><strong>BP:</strong> 120/80 mmHg</p>
                    <p><strong>HR:</strong> 72 bpm</p>
                    <p><strong>Temp:</strong> 98.6°F</p>
                    <p><strong>O2 Sat:</strong> 98%</p>
                     <p className="text-xs text-muted-foreground mt-2">As of {new Date(patient.lastVisit).toLocaleDateString()}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Medical History</CardTitle>
                    <CardDescription>Diagnoses, medications, procedures, and notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {patientHistory.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {patientHistory.map((item) => (
                        <div key={item.id} className="p-3 border rounded-md bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant={
                                      item.type === 'diagnosis' ? 'destructive' :
                                      item.type === 'medication' ? 'secondary' :
                                      item.type === 'procedure' ? 'default' :
                                      item.type === 'allergy' ? 'outline' : 
                                      'outline'
                                    } className="capitalize mb-1">
                                      {getIconForMedicalRecordType(item.type)}
                                      <span className="ml-1">{item.type}</span>
                                    </Badge>
                                    <p className="font-semibold text-foreground">{item.description}</p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            {item.doctor && <p className="text-xs text-muted-foreground mt-1">Provider: {item.doctor}</p>}
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-muted-foreground">No medical history found for this patient.</p>
                    )}
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <Briefcase className="h-5 w-5" /> Patient Appointments Log
                    </CardTitle>
                    <CardDescription>Overview of patient's visits. Useful for understanding recurring care patterns.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
                    <div>
                        <h3 className="text-md font-semibold mb-2 text-primary">Upcoming Appointments</h3>
                        {renderAppointmentList(upcomingAppointments, "Upcoming Appointments")}
                    </div>
                    <div className="pt-3 border-t">
                        <h3 className="text-md font-semibold mb-2 text-primary">Past Appointments</h3>
                        {renderAppointmentList(pastAppointments, "Past Appointments")}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
       <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline" className="opacity-50 cursor-not-allowed">Edit Chart Details</Button>
            <Button className="opacity-50 cursor-not-allowed">Add New Medical Entry</Button>
        </div>
    </div>
  );
}
