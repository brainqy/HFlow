
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { placeholderServices, generateSlug } from '@/lib/placeholder-data';
import type { Service } from '@/types';
import { Briefcase, PlusCircle, Edit3, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getServiceIcon, serviceIconList, defaultServiceIconName } from '@/lib/icon-map';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const serviceFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Service name must be at least 3 characters."),
  iconName: z.string().min(1, "Icon is required."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description too long for overview."),
  details: z.string().min(20, "Details must be at least 20 characters.").optional(),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ManageServicesPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>(() => [...placeholderServices]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      iconName: defaultServiceIconName,
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "medical service"
    },
  });

 useEffect(() => {
    if (editingService) {
      form.reset({
        ...editingService,
        details: editingService.details || '',
        imageUrl: editingService.imageUrl || "https://placehold.co/600x400.png",
        dataAiHint: editingService.dataAiHint || 'medical service',
      });
    } else {
      form.reset({
        id: '',
        name: '',
        iconName: defaultServiceIconName,
        description: '',
        details: '',
        imageUrl: 'https://placehold.co/600x400.png',
        dataAiHint: 'medical service',
      });
    }
  }, [editingService, form, isDialogOpen]);


  const handleAddOrUpdateService = (data: ServiceFormValues) => {
    const serviceData: Service = {
      id: editingService ? editingService.id : (data.id || generateSlug(data.name)),
      name: data.name,
      iconName: data.iconName,
      description: data.description,
      details: data.details || '',
      imageUrl: data.imageUrl || "https://placehold.co/600x400.png",
      dataAiHint: data.dataAiHint || 'medical service',
    };

    if (editingService) {
      const index = placeholderServices.findIndex(s => s.id === editingService.id);
      if (index !== -1) {
        placeholderServices[index] = serviceData; // Mutate original for prototype
        setServices(prev => prev.map(s => s.id === editingService.id ? serviceData : s));
        toast({ title: "Service Updated", description: `"${serviceData.name}" has been updated.` });
      }
    } else {
      // Check if ID is unique
      if (placeholderServices.some(s => s.id === serviceData.id)) {
         form.setError("name", { type: "manual", message: "Service ID/Slug from name already exists. Please use a unique name or edit the existing service." });
        return;
      }
      placeholderServices.unshift(serviceData); // Mutate original for prototype
      setServices(prev => [serviceData, ...prev]);
      toast({ title: "Service Added", description: `"${serviceData.name}" has been added.` });
    }
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };
  
  const attemptDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteService = () => {
    if (serviceToDelete) {
      const index = placeholderServices.findIndex(s => s.id === serviceToDelete.id);
      if (index !== -1) {
        placeholderServices.splice(index, 1); // Mutate original for prototype
      }
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      toast({ title: "Service Deleted", description: `"${serviceToDelete.name}" has been deleted.` });
    }
    setIsDeleteConfirmOpen(false);
    setServiceToDelete(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <Briefcase className="h-8 w-8" /> Manage Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Add, edit, and remove clinic services.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Services List</CardTitle>
          <CardDescription>Overview of all clinic services offered.</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const IconComponent = getServiceIcon(service.iconName);
                  return (
                    <TableRow key={service.id}>
                      <TableCell><IconComponent className="h-6 w-6 text-primary" /></TableCell>
                      <TableCell className="font-medium max-w-xs truncate">{service.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-md truncate">{service.description}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => openEditDialog(service)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => attemptDeleteService(service)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No services found. Click "Add New Service" to create one.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingService(null); }}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit" : "Add New"} Service</DialogTitle>
            <DialogDescription>
              {editingService ? "Update the details of this service." : "Fill in the form to create a new service."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateService)} className="space-y-4 py-2 pr-2">
              <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g., Cardiology Consultation" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="iconName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceIconList.map(iconKey => (
                        <SelectItem key={iconKey} value={iconKey}>
                          <div className="flex items-center gap-2">
                            {React.createElement(getServiceIcon(iconKey), { className: "h-4 w-4"})}
                            {iconKey}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
                )}
              />
              <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description (for listings)</FormLabel>
                    <FormControl><Textarea {...field} placeholder="Brief overview of the service..." className="min-h-[80px]" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="details" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Information (for service page/dialog)</FormLabel>
                    <FormControl><Textarea {...field} placeholder="Full details about the service..." className="min-h-[120px]" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField control={form.control} name="dataAiHint" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image AI Hint (Optional)</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., heart checkup" /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
               {!editingService && (
                 <FormField control={form.control} name="id" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service ID/Slug (Optional)</FormLabel>
                    <FormControl><Input {...field} placeholder="auto-generated from name if empty" /></FormControl>
                    <FormDescription>If left empty, a URL-friendly ID will be generated from the name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               )}
              <DialogFooter className="pt-4">
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (editingService ? "Updating..." : "Adding...") : (editingService ? "Save Changes" : "Add Service")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The service "{serviceToDelete?.name}" will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setServiceToDelete(null)}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeleteService}>Delete Service</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
