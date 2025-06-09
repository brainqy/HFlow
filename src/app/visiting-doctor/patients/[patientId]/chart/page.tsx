
"use client";

import React, { useState, useEffect } from 'react';
import { placeholderDoctorPatients, placeholderMedicalHistory, allClinicAppointments, placeholderVisitingDoctors } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CalendarDays, Stethoscope, FileText, Pill, Briefcase, StickyNote, PlusCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { DoctorAppointment, MedicalRecordItem } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon as CalendarIconLucide } from 'lucide-react'; // Renamed to avoid conflict

const getIconForMedicalRecordType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'diagnosis': return <Stethoscope className="h-4 w-4 mr-1.5" />;
    case 'medication': return <Pill className="h-4 w-4 mr-1.5" />;
    case 'procedure': return <FileText className="h-4 w-4 mr-1.5" />;
    case 'allergy': return <AlertTriangle className="h-4 w-4 mr-1.5 text-amber-600" />;
    default: return <FileText className="h-4 w-4 mr-1.5" />;
  }
};

const getBadgeForType = (type: string) => {
  const icon = getIconForMedicalRecordType(type);
  switch (type.toLowerCase()) {
    case 'diagnosis': return <Badge variant="destructive" className="capitalize flex items-center">{icon}Diagnosis</Badge>;
    case 'medication': return <Badge variant="secondary" className="capitalize flex items-center">{icon}Medication</Badge>;
    case 'allergy': return <Badge variant="outline" className="border-amber-500 text-amber-600 capitalize flex items-center">{icon}Allergy</Badge>;
    case 'procedure': return <Badge variant="default" className="capitalize flex items-center">{icon}Procedure</Badge>;
    default: return <Badge variant="outline" className="capitalize flex items-center">{icon}Note</Badge>;
  }
};

const addMedicalNoteSchema = z.object({
  note: z.string().min(10, "Note must be at least 10 characters."),
  date: z.date({ required_error: "Date is required." }),
});
type AddMedicalNoteFormValues = z.infer<typeof addMedicalNoteSchema>;


export default function VisitingDoctorPatientChartPage({ params }: { params: { patientId: string } }) {
  const { toast } = useToast();
  const patient = placeholderDoctorPatients.find((p) => p.id === params.patientId);
  
  // For prototype, assume a logged-in visiting doctor. Hardcode ID for data filtering.
  const visitingDoctorId = "visiting-doc-1"; 
  const visitingDoctorProfile = placeholderVisitingDoctors.find(vd => vd.id === visitingDoctorId);
  const doctorName = visitingDoctorProfile?.name || "Visiting Doctor";


  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  
  const [currentPatientDetails, setCurrentPatientDetails] = useState({
    dob: "1980-01-01", 
    gender: "Female", 
    contact: "555-0101", 
    emergencyContact: "Relative - 555-0102" 
  });

  const [currentPatientHistory, setCurrentPatientHistory] = useState<MedicalRecordItem[]>([]);
  const [patientAllergies, setPatientAllergies] = useState<MedicalRecordItem[]>([]);

  useEffect(() => {
    if (patient) {
      // Mock patient details for now
      setCurrentPatientDetails({
        dob: "1985-05-15", 
        gender: "Male", 
        contact: patient.phone || "N/A",
        emergencyContact: "Partner - 555-9876"
      });
      const historyFromSource = placeholderMedicalHistory.filter(
        (item, index) => index % placeholderDoctorPatients.length === placeholderDoctorPatients.findIndex(p => p.id === params.patientId) || item.doctor === "Dr. Emily Carter" || item.doctor === "Dr. James Lee" || item.doctor === "Dr. Sarah Green" || item.recordedBy === visitingDoctorId
      );
      setCurrentPatientHistory(historyFromSource.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setPatientAllergies(historyFromSource.filter(item => item.type === 'allergy'));
    }
  }, [patient, params.patientId, visitingDoctorId]);

  const addNoteForm = useForm<AddMedicalNoteFormValues>({
    resolver: zodResolver(addMedicalNoteSchema),
    defaultValues: {
      note: '',
      date: new Date(),
    }
  });
  
  const onAddNoteSubmit = (data: AddMedicalNoteFormValues) => {
    const newEntry: MedicalRecordItem = {
      id: `mr-vd-${Date.now()}`, 
      date: format(data.date, 'yyyy-MM-dd'),
      type: 'note',
      description: data.note,
      doctor: doctorName, // Attributed to the current visiting doctor
      recordedBy: visitingDoctorId,
    };
    // Mutate global placeholderMedicalHistory for prototype
    placeholderMedicalHistory.unshift(newEntry);
    const updatedHistory = [newEntry, ...currentPatientHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setCurrentPatientHistory(updatedHistory);
    toast({ title: "Note Added", description: `A new note was added to ${patient?.name}'s chart.` });
    setIsAddNoteOpen(false);
    addNoteForm.reset();
  };

  if (!patient) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-xl text-muted-foreground">Patient not found or not assigned to you.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/visiting-doctor/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assigned Patient List
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/visiting-doctor/patients" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Patient List
            </Link>
          </Button>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <User className="h-8 w-8" /> Patient Chart: {patient.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Viewing medical records (read-only, add notes only).
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
                    <p><strong>Date of Birth:</strong> {new Date(currentPatientDetails.dob).toLocaleDateString()}</p>
                    <p><strong>Gender:</strong> {currentPatientDetails.gender}</p>
                    <p><strong>Contact:</strong> {currentPatientDetails.contact}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg border-l-4 border-amber-500">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2 text-amber-700">
                        <AlertTriangle className="h-5 w-5" /> Allergies & Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {patientAllergies.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {patientAllergies.map(allergy => (
                                <li key={allergy.id}>
                                    <span className="font-semibold text-amber-700">{allergy.description}</span>
                                    <span className="text-xs text-muted-foreground"> (Recorded: {format(new Date(allergy.date), "PPP")})</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No known allergies recorded.</p>
                    )}
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
                    {currentPatientHistory.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {currentPatientHistory.map((item) => (
                        <div key={item.id} className="p-3 border rounded-md bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                   {getBadgeForType(item.type)}
                                  <p className="font-semibold text-foreground mt-1">{item.description}</p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            {item.doctor && <p className="text-xs text-muted-foreground mt-1">Recorded By: {item.doctor}</p>}
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-muted-foreground">No medical history found for this patient.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4" />Add Consultation Note</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>Add Consultation Note for {patient.name}</DialogTitle>
                                <DialogDescription>Record your observations and notes for this patient encounter.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={addNoteForm.handleSubmit(onAddNoteSubmit)} className="space-y-4 py-2">
                                <div>
                                    <Label htmlFor="noteDate">Date of Note</Label>
                                    <Controller
                                        name="date"
                                        control={addNoteForm.control}
                                        render={({ field }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn("w-full justify-start text-left font-normal mt-1", !field.value && "text-muted-foreground")}
                                                    >
                                                        <CalendarIconLucide className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                    {addNoteForm.formState.errors.date && <p className="text-xs text-destructive mt-1">{addNoteForm.formState.errors.date.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="noteContent">Consultation Note</Label>
                                    <Textarea id="noteContent" {...addNoteForm.register("note")} placeholder="Enter consultation details here..." className="min-h-[150px] mt-1" />
                                    {addNoteForm.formState.errors.note && <p className="text-xs text-destructive mt-1">{addNoteForm.formState.errors.note.message}</p>}
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={addNoteForm.formState.isSubmitting}>Add Note</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
