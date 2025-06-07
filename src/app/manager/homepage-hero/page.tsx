
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { heroSlides, generateSlug } from '@/lib/placeholder-data'; // Ensure heroSlides is mutable
import type { HeroSlideItem } from '@/types';
import { Image as ImageIcon, PlusCircle, Edit3, Trash2, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
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

const heroSlideSchema = z.object({
  id: z.string().optional(), // Optional for new, present for edit
  title: z.string().min(5, "Title must be at least 5 characters."),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters."),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  altText: z.string().min(5, "Alt text must be at least 5 characters."),
  dataAiHint: z.string().min(2, "AI hint must be at least 2 characters."),
  ctaText: z.string().min(3, "CTA text must be at least 3 characters."),
  ctaLink: z.string().url({ message: "Please enter a valid CTA URL (e.g., /appointments or https://example.com)." })
           .refine(val => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'), {
             message: "CTA Link must be a relative path (e.g. /about) or an absolute URL (e.g. https://example.com)"
           }),
});

type HeroSlideFormValues = z.infer<typeof heroSlideSchema>;

export default function ManageHomepageHeroPage() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlideItem[]>([]);
  const [isAddOrEditDialogOpen, setIsAddOrEditDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<HeroSlideItem | null>(null);

  // Sync local state with global placeholder data
  useEffect(() => {
    setSlides([...heroSlides]); // Create a mutable copy for local state
  }, []);


  const form = useForm<HeroSlideFormValues>({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      imageUrl: "https://placehold.co/1920x1080.png",
      altText: "",
      dataAiHint: "",
      ctaText: "Learn More",
      ctaLink: "/",
    },
  });

  useEffect(() => {
    if (editingSlide) {
      form.reset(editingSlide);
    } else {
      form.reset({
        id: generateSlug(`hero-${Date.now().toString().slice(-6)}`),
        title: "",
        subtitle: "",
        imageUrl: "https://placehold.co/1920x1080.png",
        altText: "",
        dataAiHint: "",
        ctaText: "Learn More",
        ctaLink: "/",
      });
    }
  }, [editingSlide, form, isAddOrEditDialogOpen]);

  const handleAddOrUpdateSlide = (data: HeroSlideFormValues) => {
    const newSlideData: HeroSlideItem = {
      ...data,
      id: editingSlide ? editingSlide.id : (data.id || generateSlug(`hero-${Date.now().toString().slice(-6)}`)),
    };

    let updatedGlobalSlides;
    if (editingSlide) {
      const index = heroSlides.findIndex(s => s.id === editingSlide.id);
      if (index !== -1) {
        heroSlides[index] = newSlideData; 
        updatedGlobalSlides = [...heroSlides];
        toast({ title: "Hero Slide Updated", description: `Slide "${newSlideData.title}" has been updated.` });
      } else {
        toast({ title: "Error", description: "Could not find slide to update.", variant: "destructive" });
        return;
      }
    } else {
      if (heroSlides.some(s => s.id === newSlideData.id)) {
        form.setError("title", { type: "manual", message: "A slide with this ID already exists. Please try a different title or ensure unique ID if manual."});
        return;
      }
      heroSlides.unshift(newSlideData); 
      updatedGlobalSlides = [...heroSlides];
      toast({ title: "Hero Slide Added", description: `Slide "${newSlideData.title}" has been added.` });
    }

    setSlides(updatedGlobalSlides); 
    setIsAddOrEditDialogOpen(false);
    setEditingSlide(null);
    form.reset(); 
  };

  const openEditDialog = (slide: HeroSlideItem) => {
    setEditingSlide(slide);
    setIsAddOrEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingSlide(null); 
    setIsAddOrEditDialogOpen(true);
  };
  
  const attemptDeleteSlide = (slide: HeroSlideItem) => {
    setSlideToDelete(slide);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteSlide = () => {
    if (slideToDelete) {
      const index = heroSlides.findIndex(s => s.id === slideToDelete.id);
      if (index !== -1) {
        heroSlides.splice(index, 1); 
      }
      setSlides(prev => prev.filter(s => s.id !== slideToDelete.id));
      toast({ title: "Hero Slide Deleted", description: `Slide "${slideToDelete.title}" has been removed.` });
    }
    setIsDeleteConfirmOpen(false);
    setSlideToDelete(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <ImageIcon className="h-8 w-8" /> Manage Homepage Hero Slider
          </h1>
          <p className="text-muted-foreground mt-1">
            Add, edit, or remove slides from the main landing page hero banner.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Slide
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Current Hero Slides</CardTitle>
          <CardDescription>Overview of all slides in the hero banner.</CardDescription>
        </CardHeader>
        <CardContent>
          {slides.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Subtitle</TableHead>
                  <TableHead className="hidden lg:table-cell">CTA Text</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <Image src={slide.imageUrl} alt={slide.altText} data-ai-hint={slide.dataAiHint} width={80} height={45} className="rounded object-cover aspect-video"/>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{slide.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-sm truncate">{slide.subtitle}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{slide.ctaText}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => openEditDialog(slide)}> 
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => attemptDeleteSlide(slide)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No hero slides found. Click "Add New Slide" to create one.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddOrEditDialogOpen} onOpenChange={(isOpen) => { setIsAddOrEditDialogOpen(isOpen); if (!isOpen) setEditingSlide(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSlide ? "Edit" : "Add New"} Hero Slide</DialogTitle>
            <DialogDescription>
              {editingSlide ? "Update the details of this hero slide." : "Fill in the form to create a new hero slide."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateSlide)} className="space-y-4 py-2 pr-2">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} placeholder="Your Health, Our Priority" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="subtitle" render={({ field }) => (
                <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} placeholder="Brief and engaging subtitle..." className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} placeholder="https://placehold.co/1920x1080.png" /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="altText" render={({ field }) => (
                  <FormItem><FormLabel>Image Alt Text</FormLabel><FormControl><Input {...field} placeholder="Descriptive alt text for accessibility" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dataAiHint" render={({ field }) => (
                  <FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} placeholder="e.g., modern hospital interior" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="ctaText" render={({ field }) => (
                  <FormItem><FormLabel>CTA Button Text</FormLabel><FormControl><Input {...field} placeholder="Book an Appointment" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ctaLink" render={({ field }) => (
                  <FormItem><FormLabel>CTA Button Link</FormLabel><FormControl><Input {...field} placeholder="/appointments or https://..." /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
               {!editingSlide && (
                <FormField control={form.control} name="id" render={({ field }) => (
                  <FormItem><FormLabel>Slide ID (Auto-generated)</FormLabel><FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl>
                  <FormDescription>This ID is auto-generated and cannot be changed.</FormDescription>
                  <FormMessage /></FormItem>
                )}
              />
              )}
              <DialogFooter className="pt-4">
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (editingSlide ? "Updating..." : "Adding...") : (editingSlide ? "Save Changes" : "Add Slide")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the slide titled "{slideToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSlideToDelete(null)}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeleteSlide}>Delete Slide</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

