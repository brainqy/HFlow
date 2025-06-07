
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { placeholderAnnouncements, generateSlug } from '@/lib/placeholder-data';
import type { Announcement, AnnouncementDisplayLocation } from '@/types';
import { ShieldAlert, PlusCircle, Edit3, Trash2, CalendarIcon as CalendarDaysIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const displayLocationOptions: { id: AnnouncementDisplayLocation; label: string }[] = [
  { id: 'homepage', label: 'Homepage' },
  { id: 'patient_portal', label: 'Patient Portal' },
  { id: 'doctor_portal', label: 'Doctor Portal' },
  { id: 'nurse_portal', label: 'Nurse Portal' },
  { id: 'receptionist_portal', label: 'Receptionist Portal' },
  { id: 'manager_portal', label: 'Manager Portal' },
  { id: 'all_portals', label: 'All Portals (Overrides others)' },
];

const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  displayLocations: z.array(z.string()).min(1, { message: "At least one display location must be selected." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date().nullable().optional(),
  createdAt: z.date().optional(),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

export default function ManageAnnouncementsPage() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);

  useEffect(() => {
    // Ensure dates from placeholder data are Date objects
    const processedAnnouncements = placeholderAnnouncements.map(ann => ({
        ...ann,
        startDate: typeof ann.startDate === 'string' ? parseISO(ann.startDate) : ann.startDate,
        endDate: ann.endDate ? (typeof ann.endDate === 'string' ? parseISO(ann.endDate) : ann.endDate) : null,
        createdAt: typeof ann.createdAt === 'string' ? parseISO(ann.createdAt) : ann.createdAt,
    }));
    setAnnouncements(processedAnnouncements);
  }, []);

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
      displayLocations: [],
      startDate: new Date(),
      endDate: null,
    },
  });

  useEffect(() => {
    if (editingAnnouncement) {
      form.reset({
        ...editingAnnouncement,
        startDate: new Date(editingAnnouncement.startDate),
        endDate: editingAnnouncement.endDate ? new Date(editingAnnouncement.endDate) : null,
        displayLocations: editingAnnouncement.displayLocations as string[], // Zod expects string[] here
      });
    } else {
      form.reset({
        id: '',
        title: '',
        content: '',
        displayLocations: [],
        startDate: new Date(),
        endDate: null,
      });
    }
  }, [editingAnnouncement, form, isDialogOpen]);

  const handleAddOrUpdateAnnouncement = (data: AnnouncementFormValues) => {
    const announcementData: Announcement = {
      id: editingAnnouncement ? editingAnnouncement.id : (data.id || generateSlug(`ann-${Date.now()}`)),
      title: data.title,
      content: data.content,
      displayLocations: data.displayLocations as AnnouncementDisplayLocation[],
      startDate: data.startDate,
      endDate: data.endDate,
      createdAt: editingAnnouncement ? editingAnnouncement.createdAt : new Date(),
    };

    let updatedGlobalAnnouncements;
    if (editingAnnouncement) {
      const index = placeholderAnnouncements.findIndex(a => a.id === editingAnnouncement.id);
      if (index !== -1) {
        placeholderAnnouncements[index] = announcementData; // Mutate original for prototype
        updatedGlobalAnnouncements = [...placeholderAnnouncements];
        toast({ title: "Announcement Updated", description: `"${announcementData.title}" has been updated.` });
      } else {
        toast({ title: "Error", description: "Could not find announcement to update.", variant: "destructive" });
        return;
      }
    } else {
      placeholderAnnouncements.unshift(announcementData); // Mutate original for prototype
      updatedGlobalAnnouncements = [...placeholderAnnouncements];
      toast({ title: "Announcement Added", description: `"${announcementData.title}" has been added.` });
    }
    
    // Process for local state display (ensure Date objects)
    const processedForState = updatedGlobalAnnouncements.map(ann => ({
        ...ann,
        startDate: typeof ann.startDate === 'string' ? parseISO(ann.startDate) : ann.startDate,
        endDate: ann.endDate ? (typeof ann.endDate === 'string' ? parseISO(ann.endDate) : ann.endDate) : null,
        createdAt: typeof ann.createdAt === 'string' ? parseISO(ann.createdAt) : ann.createdAt,
    })).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

    setAnnouncements(processedForState);
    setIsDialogOpen(false);
    setEditingAnnouncement(null);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingAnnouncement(null);
    setIsDialogOpen(true);
  };
  
  const attemptDeleteAnnouncement = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteAnnouncement = () => {
    if (announcementToDelete) {
      const index = placeholderAnnouncements.findIndex(a => a.id === announcementToDelete.id);
      if (index !== -1) {
        placeholderAnnouncements.splice(index, 1); // Mutate original for prototype
      }
      setAnnouncements(prev => prev.filter(a => a.id !== announcementToDelete.id));
      toast({ title: "Announcement Deleted", description: `"${announcementToDelete.title}" has been deleted.` });
    }
    setIsDeleteConfirmOpen(false);
    setAnnouncementToDelete(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" /> Manage Announcements
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and manage clinic-wide announcements.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Announcement
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Current Announcements</CardTitle>
          <CardDescription>Overview of all active and past announcements.</CardDescription>
        </CardHeader>
        <CardContent>
          {announcements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Dates</TableHead>
                  <TableHead className="hidden md:table-cell">Display Locations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((ann) => (
                  <TableRow key={ann.id}>
                    <TableCell className="font-medium max-w-xs truncate">{ann.title}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs">
                      {format(ann.startDate, "PPP")} - {ann.endDate ? format(ann.endDate, "PPP") : 'Ongoing'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs">
                      {ann.displayLocations.map(loc => displayLocationOptions.find(o => o.id === loc)?.label || loc).join(', ')}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => openEditDialog(ann)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => attemptDeleteAnnouncement(ann)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No announcements found. Click "Add New Announcement" to create one.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingAnnouncement(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? "Edit" : "Create New"} Announcement</DialogTitle>
            <DialogDescription>
              {editingAnnouncement ? "Update the details of this announcement." : "Fill in the form to create a new announcement."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateAnnouncement)} className="space-y-6 py-2 pr-2">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title*</FormLabel><FormControl><Input {...field} placeholder="e.g., Holiday Hours Update" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem><FormLabel>Content*</FormLabel><FormControl><Textarea {...field} placeholder="Detailed announcement message..." className="min-h-[100px]" /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField
                control={form.control}
                name="displayLocations"
                render={() => (
                  <FormItem>
                    <FormLabel>Display Locations*</FormLabel>
                    <FormDescription>Select where this announcement should appear.</FormDescription>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                    {displayLocationOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="displayLocations"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), option.id])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-sm">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="startDate"
                  render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                         <FormControl>
                          <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarDaysIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                         </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                    </Popover><FormMessage />
                  </FormItem>
                  )}
                />
                 <FormField control={form.control} name="endDate"
                  render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                         <FormControl>
                          <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarDaysIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date (or leave blank)</span>}
                          </Button>
                         </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={(date) => field.onChange(date || null)} initialFocus />
                        <Button variant="ghost" size="sm" className="w-full mt-1" onClick={() => field.onChange(null)}>Clear End Date</Button>
                      </PopoverContent>
                    </Popover><FormMessage />
                  </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (editingAnnouncement ? "Updating..." : "Adding...") : (editingAnnouncement ? "Save Changes" : "Add Announcement")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this announcement?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The announcement titled "{announcementToDelete?.title}" will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAnnouncementToDelete(null)}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeleteAnnouncement}>Delete Announcement</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
    