
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { placeholderBlogPosts, generateSlug } from '@/lib/placeholder-data';
import type { BlogPost } from '@/types';
import { FileText, PlusCircle, Edit3, Trash2, CalendarIcon as CalendarDaysIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const blogPostSchema = z.object({
  slug: z.string().min(1, "Slug is required."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  date: z.date({ required_error: "Date is required." }),
  author: z.string().min(2, "Author name must be at least 2 characters."),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300, "Excerpt too long."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  dataAiHint: z.string().optional(),
  tags: z.string().optional(), // Comma-separated string
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export default function ManageBlogsPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>(() => [...placeholderBlogPosts]); // Create a mutable copy
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      author: "Manager User",
      date: new Date(),
      imageUrl: "https://placehold.co/800x450.png",
      dataAiHint: "blog article"
    },
  });

  useEffect(() => {
    if (editingPost) {
      form.reset({
        ...editingPost,
        date: new Date(editingPost.date),
        tags: editingPost.tags?.join(', ') || '',
      });
    } else {
      form.reset({
        slug: '',
        title: '',
        author: "Manager User",
        date: new Date(),
        excerpt: '',
        content: '',
        imageUrl: 'https://placehold.co/800x450.png',
        dataAiHint: 'blog article cover',
        tags: '',
      });
    }
  }, [editingPost, form, isDialogOpen]);


  const handleAddOrUpdatePost = (data: BlogPostFormValues) => {
    const postData: BlogPost = {
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    };

    if (editingPost) {
      const index = blogs.findIndex(p => p.slug === editingPost.slug);
      // If slug changed, we need to update the slug in the original array
      if (index !== -1) {
        placeholderBlogPosts[index] = postData; // Mutate original for prototype
        setBlogs(prev => prev.map(p => p.slug === editingPost.slug ? postData : p));
        toast({ title: "Blog Post Updated", description: `"${postData.title}" has been updated.` });
      }
    } else {
      // Check if slug is unique
      if (blogs.some(p => p.slug === postData.slug)) {
        form.setError("slug", { type: "manual", message: "Slug already exists. Please use a unique slug." });
        return;
      }
      placeholderBlogPosts.unshift(postData); // Mutate original for prototype
      setBlogs(prev => [postData, ...prev]);
      toast({ title: "Blog Post Added", description: `"${postData.title}" has been added.` });
    }
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };
  
  const attemptDeletePost = (post: BlogPost) => {
    setPostToDelete(post);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeletePost = () => {
    if (postToDelete) {
      const index = placeholderBlogPosts.findIndex(p => p.slug === postToDelete.slug);
      if (index !== -1) {
        placeholderBlogPosts.splice(index, 1); // Mutate original for prototype
      }
      setBlogs(prev => prev.filter(p => p.slug !== postToDelete.slug));
      toast({ title: "Blog Post Deleted", description: `"${postToDelete.title}" has been deleted.` });
    }
    setIsDeleteConfirmOpen(false);
    setPostToDelete(null);
  };

  const handleTitleChangeForSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    form.setValue("title", title);
    if (!form.getValues("slug") || editingPost?.title === form.getValues("title")) { // Only auto-fill if slug is empty or matches old title during edit
      form.setValue("slug", generateSlug(title));
    }
  };


  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
            <FileText className="h-8 w-8" /> Manage Blog Posts
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, and delete blog articles for the HealthFlow website.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Blog Posts List</CardTitle>
          <CardDescription>Overview of all published articles.</CardDescription>
        </CardHeader>
        <CardContent>
          {blogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Author</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((post) => (
                  <TableRow key={post.slug}>
                    <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">{post.author}</TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(post.date), "PPP")}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => openEditDialog(post)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => attemptDeletePost(post)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No blog posts found. Click "Add New Post" to create one.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingPost(null); }}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit" : "Add New"} Blog Post</DialogTitle>
            <DialogDescription>
              {editingPost ? "Update the details of this blog post." : "Fill in the form to create a new blog post."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddrUpdatePost)} className="space-y-4 py-2 pr-2">
              <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} onChange={handleTitleChangeForSlug} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <Input {...field} placeholder="e.g., healthy-eating-tips" />
                    <FormDescription>URL-friendly version of the title (auto-generated or custom).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="author" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField control={form.control} name="date"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Publication Date</FormLabel>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarDaysIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField control={form.control} name="excerpt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <Textarea {...field} placeholder="A short summary of the post..." className="min-h-[80px]" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="content" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Content</FormLabel>
                    <Textarea {...field} placeholder="Write the full blog post here. Use HTML for formatting if needed." className="min-h-[150px]" />
                     <FormDescription>Basic HTML can be used for formatting (e.g., &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField control={form.control} name="dataAiHint" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image AI Hint (Optional)</FormLabel>
                        <Input {...field} placeholder="e.g., healthy food"/>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Optional)</FormLabel>
                    <Input {...field} placeholder="e.g., nutrition, wellness, tips" />
                    <FormDescription>Comma-separated list of tags.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (editingPost ? "Updating..." : "Adding...") : (editingPost ? "Save Changes" : "Add Post")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The blog post titled "{postToDelete?.title}" will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDeletePost}>Delete Post</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
