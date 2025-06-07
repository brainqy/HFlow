
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { placeholderDoctors, generateSlug } from '@/lib/placeholder-data';
import type { Doctor, AvailabilitySlot } from '@/types';
import { UserCog, PlusCircle, Edit3, Trash2, CalendarDays, Clock, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from 'next/image';

const availabilitySlotSchema = z.object({
  day: z.string().min(1, "Day is required."),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, "Invalid time format (e.g., 09:00 AM)."),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, "Invalid time format (e.g., 05:00 PM)."),
  maxPatients: z.coerce.number().min(1, "Max patients must be at least 1."),
});

const doctorFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Doctor's name must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  specialty: z.string().min(3, "Specialty must be at least 3 characters."),
  bio: z.string().min(20, "Bio must be at least 20 characters."),
  education: z.string().min(1, "Education details are required (comma-separated)."),
  experience: z.string().min(1, "Experience details are required (comma-separated)."),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  dataAiHint: z.string().optional(),
  availability: z.array(availabilitySlotSchema).optional(),
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ManageDoctorsPage() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>(() => [...placeholderDoctors]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      imageUrl: "https://placehold.co/400x400.png",
      dataAiHint: "doctor professional",
      availability: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  useEffect(() => {
    if (editingDoctor) {
      form.reset({
        ...editingDoctor,
        education: editingDoctor.education.join(', '),
        experience: editingDoctor.experience.join(', '),
        availability: editingDoctor.availability || [],
      });
    } else {
      form.reset({
        id: generateSlug(`dr-${Date.now().toString().slice(-6)}`), // Simple unique ID
        name: '',
        email: '',
        specialty: '',
        bio: '',
        education: '',
        experience: '',
        imageUrl: 'https://placehold.co/400x400.png',
        dataAiHint: 'doctor professional',
        availability: [],
      });
    }
  }, [editingDoctor, form, isDialogOpen]);

  const handleAddOrUpdateDoctor = (data: DoctorFormValues) => {
    const doctorData: Doctor = {
      ...data,
      id: editingDoctor ? editingDoctor.id : (data.id || generateSlug(data.name)),
      education: data.education.split(',').map(item => item.trim()).filter(item => item),
      experience: data.experience.split(',').map(item => item.trim()).filter(item => item),
      availability: data.availability || [],
    };

    if (editingDoctor) {
      const index = placeholderDoctors.findIndex(d => d.id === editingDoctor.id);
      if (index !== -1) {
        placeholderDoctors[index] = doctorData;
        setDoctors(prev => prev.map(d => d.id === editingDoctor.id ? doctorData : d));
        toast({ title: "Doctor Profile Updated", description: `${doctorData.name}'s profile has been updated.` });
      }
    } else {
      if (placeholderDoctors.some(d => d.id === doctorData.id)) {
        form.setError("name", { type: "manual", message: "A doctor with a similar generated ID already exists. Try a slightly different name or manually set an ID if this persists." });
        return;
      }
      placeholderDoctors.unshift(doctorData);
      setDoctors(prev => [doctorData, ...prev]);
      toast({ title: "Doctor Added", description: `${doctorData.name} has been added to the directory.` });
    }
    setIsDialogOpen(false);
    setEditingDoctor(null);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingDoctor(null);
    setIsDialogOpen(true);
  };
  
  const attemptDeleteDoctor = (doctor: Doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteDoctor = () => {
    if (doctorToDelete) {
      const index = placeholderDoctors.findIndex(d => d.id === doctorToDelete.id);
      if (index !== -1) {
        placeholderDoctors.splice(index, 1);
      }
      setDoctors(prev => prev.filter(d => d.id !== doctorToDelete.id));
      toast({ title: "Doctor Deleted", description: `${doctorToDelete.name} has been removed.` });
    }
    setIsDeleteConfirmOpen(false);
    setDoctorToDelete(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <UserCog className="h-8 w-8" /> Manage Doctors &amp; Schedules
          </h1>
          <p className="text-muted-foreground mt-1">
            Add, edit, and remove doctor profiles and their availability.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Doctor
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Doctors List</CardTitle>
          <CardDescription>Overview of all doctors in the clinic.</CardDescription>
        </CardHeader>
        <CardContent>
          {doctors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <Image src={doctor.imageUrl} alt={doctor.name} data-ai-hint={doctor.dataAiHint || "doctor portrait"} width={40} height={40} className="rounded-full object-cover"/>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{doctor.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{doctor.specialty}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{doctor.email}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => openEditDialog(doctor)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => attemptDeleteDoctor(doctor)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No doctors found. Click "Add New Doctor" to create one.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingDoctor(null); }}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? "Edit" : "Add New"} Doctor Profile</DialogTitle>
            <DialogDescription>
              {editingDoctor ? "Update the doctor's details and availability." : "Fill in the form to create a new doctor profile."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateDoctor)} className="space-y-6 py-2 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} placeholder="Dr. John Doe" /></FormControl><FormMessage /></FormItem>
                  )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} type="email" placeholder="dr.doe@example.com" /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
              <FormField control={form.control} name="specialty" render={({ field }) => (
                  <FormItem><FormLabel>Specialty</FormLabel><FormControl><Input {...field} placeholder="e.g., General Practitioner" /></FormControl><FormMessage /></FormItem>
                )} />
              <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem><FormLabel>Biography</FormLabel><FormControl><Textarea {...field} placeholder="Brief biography of the doctor..." className="min-h-[100px]" /></FormControl><FormMessage /></FormItem>
                )} />
              <FormField control={form.control} name="education" render={({ field }) => (
                  <FormItem><FormLabel>Education (Comma-separated)</FormLabel><FormControl><Textarea {...field} placeholder="e.g., MD, University Name, Residency, Hospital Name" className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
                )} />
              <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem><FormLabel>Experience (Comma-separated)</FormLabel><FormControl><Textarea {...field} placeholder="e.g., Attending Physician, Clinic Name (5 years)" className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
                )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                <FormField control={form.control} name="dataAiHint" render={({ field }) => (
                    <FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} placeholder="e.g., male doctor friendly" /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
              
              <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Availability Slots</CardTitle>
                    <CardDescription>Define the doctor's weekly available time slots.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {fields.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 border rounded-md items-end">
                            <FormField control={form.control} name={`availability.${index}.day`} render={({ field }) => (
                                <FormItem><FormLabel>Day</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select Day" /></SelectTrigger></FormControl>
                                    <SelectContent>{daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}</SelectContent>
                                    </Select>
                                <FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`availability.${index}.startTime`} render={({ field }) => (
                                <FormItem><FormLabel>Start Time</FormLabel><FormControl><Input {...field} placeholder="09:00 AM" /></FormControl><FormMessage /></FormItem> )} />
                            <FormField control={form.control} name={`availability.${index}.endTime`} render={({ field }) => (
                                <FormItem><FormLabel>End Time</FormLabel><FormControl><Input {...field} placeholder="05:00 PM" /></FormControl><FormMessage /></FormItem> )} />
                             <div className="grid grid-cols-2 gap-2">
                                <FormField control={form.control} name={`availability.${index}.maxPatients`} render={({ field }) => (
                                    <FormItem><FormLabel>Max Pts</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="self-end"><X className="h-4 w-4" /></Button>
                             </div>
                        </div>
                    ))}
                     <Button type="button" variant="outline" onClick={() => append({ day: 'Monday', startTime: '09:00 AM', endTime: '05:00 PM', maxPatients: 10 })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Availability Slot
                    </Button>
                </CardContent>
              </Card>

              {!editingDoctor && (
                 <FormField control={form.control} name="id" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor ID (Optional)</FormLabel>
                    <FormControl><Input {...field} placeholder="auto-generated if empty" /></FormControl>
                    <FormDescription>If left empty, a unique ID will be generated.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               )}
              <DialogFooter className="pt-4">
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (editingDoctor ? "Updating..." : "Adding...") : (editingDoctor ? "Save Changes" : "Add Doctor")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this doctor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Dr. {doctorToDelete?.name}'s profile and schedule will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDoctorToDelete(null)}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeleteDoctor}>Delete Doctor</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
