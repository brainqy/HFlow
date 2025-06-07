
"use client";

import React, { useState, useEffect } from 'react';
import { placeholderDoctorPatients, placeholderMedicalHistory, allClinicAppointments } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, CalendarDays, Stethoscope, FileText, Pill, Briefcase, StickyNote, Edit3, PlusCircle, Calendar as CalendarIconLucide, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { DoctorAppointment, MedicalRecordItem } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

const editPatientDetailsSchema = z.object({
  contact: z.string().min(10, "Phone number must be at least 10 digits.").optional(),
  emergencyContact: z.string().min(3, "Emergency contact must be at least 3 characters.").optional(),
});
type EditPatientDetailsFormValues = z.infer<typeof editPatientDetailsSchema>;

const addMedicalEntrySchema = z.object({
  type: z.enum(['diagnosis', 'medication', 'procedure', 'allergy', 'note']),
  description: z.string().min(5, "Description must be at least 5 characters."),
  date: z.date({ required_error: "Date is required." }),
  doctor: z.string().min(2, "Doctor name is required."),
});
type AddMedicalEntryFormValues = z.infer<typeof addMedicalEntrySchema>;


export default function PatientChartPage({ params }: { params: { patientId: string } }) {
  const { toast } = useToast();
  const patient = placeholderDoctorPatients.find((p) => p.id === params.patientId);

  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  
  const [currentPatientDetails, setCurrentPatientDetails] = useState({
    dob: "1980-01-01", 
    gender: "Female", 
    contact: "555-0101", 
    emergencyContact: "Jane Doe (Spouse) - 555-0102" 
  });

  const [currentPatientHistory, setCurrentPatientHistory] = useState<MedicalRecordItem[]>([]);
  const [patientAllergies, setPatientAllergies] = useState<MedicalRecordItem[]>([]);

  useEffect(() => {
    if (patient) {
      const detailsFromSource = {
        dob: "1980-01-01", 
        gender: "Female", 
        contact: patient.phone || "555-0101",
        emergencyContact: "Jane Doe (Spouse) - 555-0102" 
      };
      setCurrentPatientDetails(detailsFromSource);

      const historyFromSource = placeholderMedicalHistory.filter(
        (item, index) => index % placeholderDoctorPatients.length === placeholderDoctorPatients.findIndex(p => p.id === params.patientId) || item.doctor === "Dr. Eleanor Vance" || item.doctor === "Dr. Emily Carter" || item.doctor === "Dr. James Lee" || item.doctor === "Dr. Sarah Green"
      );
      setCurrentPatientHistory(historyFromSource.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setPatientAllergies(historyFromSource.filter(item => item.type === 'allergy'));
    }
  }, [patient, params.patientId]);


  const patientAllAppointments = allClinicAppointments
    .filter(appt => appt.patientName === patient?.name) 
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time));

  const upcomingAppointments = patientAllAppointments.filter(appt => new Date(appt.date) >= new Date(new Date().setHours(0,0,0,0))).reverse();
  const pastAppointments = patientAllAppointments.filter(appt => new Date(appt.date) < new Date(new Date().setHours(0,0,0,0)));
  const nextScheduledAppointment = upcomingAppointments[0];

  const editDetailsForm = useForm<EditPatientDetailsFormValues>({
    resolver: zodResolver(editPatientDetailsSchema),
    defaultValues: {
      contact: currentPatientDetails.contact,
      emergencyContact: currentPatientDetails.emergencyContact,
    }
  });

  useEffect(() => { 
      editDetailsForm.reset({
          contact: currentPatientDetails.contact,
          emergencyContact: currentPatientDetails.emergencyContact,
      });
  }, [currentPatientDetails, editDetailsForm, isEditDetailsOpen]);


  const addEntryForm = useForm<AddMedicalEntryFormValues>({
    resolver: zodResolver(addMedicalEntrySchema),
    defaultValues: {
      type: 'note',
      description: '',
      doctor: 'Dr. Eleanor Vance', 
    }
  });
  
  const onEditDetailsSubmit = (data: EditPatientDetailsFormValues) => {
    setCurrentPatientDetails(prev => ({...prev, ...data}));
    toast({ title: "Patient Details Updated", description: "Contact information has been updated (mocked)." });
    setIsEditDetailsOpen(false);
  };

  const onAddEntrySubmit = (data: AddMedicalEntryFormValues) => {
    const newEntry: MedicalRecordItem = {
      id: `mr-${Date.now()}`, 
      date: format(data.date, 'yyyy-MM-dd'),
      type: data.type,
      description: data.description,
      doctor: data.doctor,
    };
    const updatedHistory = [newEntry, ...currentPatientHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setCurrentPatientHistory(updatedHistory);
    if (newEntry.type === 'allergy') {
        setPatientAllergies(prev => [newEntry, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    toast({ title: "Medical Entry Added", description: `A new ${data.type} record was added (mocked).` });
    setIsAddEntryOpen(false);
    addEntryForm.reset();
  };


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
                    <p><strong>Date of Birth:</strong> {new Date(currentPatientDetails.dob).toLocaleDateString()}</p>
                    <p><strong>Gender:</strong> {currentPatientDetails.gender}</p>
                    <p><strong>Contact:</strong> {currentPatientDetails.contact}</p>
                    <p><strong>Emergency Contact:</strong> {currentPatientDetails.emergencyContact}</p>
                    <p><strong>Last Visit (Recorded):</strong> {new Date(patient.lastVisit).toLocaleDateString()}</p>
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
                        <ul className="space-y-2">
                            {patientAllergies.map(allergy => (
                                <li key={allergy.id} className="text-sm">
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-primary" /> Care Plan & Notes
                </CardTitle>
                <CardDescription>Notes for ongoing or recurring care.</CardDescription>
              </CardHeader>
              <CardContent>
                {nextScheduledAppointment ? (
                  <div className="mb-4 p-3 border border-primary/30 rounded-md bg-primary/5">
                    <p className="text-sm font-semibold text-primary">Next Scheduled Appointment:</p>
                    <p className="text-sm text-foreground">{format(new Date(nextScheduledAppointment.date), "PPP")} at {nextScheduledAppointment.time}</p>
                    <p className="text-xs text-muted-foreground">Reason: {nextScheduledAppointment.reason}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">No upcoming appointments scheduled.</p>
                )}
                <Textarea 
                  placeholder="Enter care plan notes, e.g., 'Follow up every 3 months for check-up and medication review. Monitor blood pressure closely...'" 
                  className="min-h-[100px]"
                  defaultValue={"Monitor blood pressure closely. Patient to return in 3 months for follow-up on hypertension management. Encourage lifestyle modifications."}
                  readOnly 
                />
                 <Button variant="outline" size="sm" className="mt-2 opacity-50 cursor-not-allowed">Edit Care Plan</Button>
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
                    <div className="pt-3 border-t mt-4">
                        <h3 className="text-md font-semibold mb-2 text-primary">Past Appointments</h3>
                        {renderAppointmentList(pastAppointments, "Past Appointments")}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
       <div className="mt-8 flex justify-end gap-2">
            <Dialog open={isEditDetailsOpen} onOpenChange={setIsEditDetailsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" />Edit Chart Details</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Patient Details: {patient.name}</DialogTitle>
                        <DialogDescription>Update contact and emergency information.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={editDetailsForm.handleSubmit(onEditDetailsSubmit)} className="space-y-4 py-2">
                        <div>
                            <Label htmlFor="contact">Contact Phone</Label>
                            <Input id="contact" {...editDetailsForm.register("contact")} defaultValue={currentPatientDetails.contact} />
                            {editDetailsForm.formState.errors.contact && <p className="text-xs text-destructive mt-1">{editDetailsForm.formState.errors.contact.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="emergencyContact">Emergency Contact</Label>
                            <Textarea id="emergencyContact" {...editDetailsForm.register("emergencyContact")} defaultValue={currentPatientDetails.emergencyContact} />
                            {editDetailsForm.formState.errors.emergencyContact && <p className="text-xs text-destructive mt-1">{editDetailsForm.formState.errors.emergencyContact.message}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={editDetailsForm.formState.isSubmitting}>Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4" />Add New Medical Entry</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Add New Medical Entry for {patient.name}</DialogTitle>
                        <DialogDescription>Record a new diagnosis, medication, procedure, allergy, or note.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={addEntryForm.handleSubmit(onAddEntrySubmit)} className="space-y-4 py-2">
                        <div>
                            <Label htmlFor="entryType">Entry Type</Label>
                            <Controller
                                name="type"
                                control={addEntryForm.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger id="entryType"><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="diagnosis">Diagnosis</SelectItem>
                                            <SelectItem value="medication">Medication</SelectItem>
                                            <SelectItem value="procedure">Procedure</SelectItem>
                                            <SelectItem value="allergy">Allergy</SelectItem>
                                            <SelectItem value="note">Note</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {addEntryForm.formState.errors.type && <p className="text-xs text-destructive mt-1">{addEntryForm.formState.errors.type.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="entryDate">Date</Label>
                            <Controller
                                name="date"
                                control={addEntryForm.control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
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
                            {addEntryForm.formState.errors.date && <p className="text-xs text-destructive mt-1">{addEntryForm.formState.errors.date.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="entryDoctor">Recorded By (Doctor)</Label>
                            <Input id="entryDoctor" {...addEntryForm.register("doctor")} />
                            {addEntryForm.formState.errors.doctor && <p className="text-xs text-destructive mt-1">{addEntryForm.formState.errors.doctor.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="entryDescription">Description / Details</Label>
                            <Textarea id="entryDescription" {...addEntryForm.register("description")} placeholder="Enter details here..." className="min-h-[100px]" />
                            {addEntryForm.formState.errors.description && <p className="text-xs text-destructive mt-1">{addEntryForm.formState.errors.description.message}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={addEntryForm.formState.isSubmitting}>Add Entry</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}

