
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCircle, Mail, Phone, KeyRound, Edit, Home, CalendarDaysIcon, UserIcon as GenderIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function PatientProfilePage() {
  const { toast } = useToast();
  // Placeholder data - in a real app, this would come from a backend/auth context
  const [profile, setProfile] = useState({
    name: 'Jane Doe (Patient Portal User)',
    email: 'patient@example.com',
    phone: '(555) 123-4567',
    dob: 'January 1, 1985',
    gender: 'Female',
    address: '123 Wellness Ave, Health City, HC 54321',
  });
  
  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [editablePhone, setEditablePhone] = useState(profile.phone);
  const [editableAddress, setEditableAddress] = useState(profile.address);


  const handleSaveContactInfo = () => {
    // Mock save
    setProfile(prev => ({...prev, phone: editablePhone, address: editableAddress}));
    toast({title: "Contact Info Updated", description: "Your contact information has been saved."});
    setIsEditContactOpen(false);
  }

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock update
    toast({title: "Password Change Requested", description: "Password update functionality is for demonstration."});
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCircle className="h-8 w-8" /> My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage your personal information and account settings.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="font-headline text-xl">Personal Information</CardTitle>
            <CardDescription>Your personal and contact details.</CardDescription>
          </div>
          <Dialog open={isEditContactOpen} onOpenChange={setIsEditContactOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/>Edit Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
                <DialogDescription>Update your phone number and address.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="editPhone">Phone Number</Label>
                  <Input id="editPhone" value={editablePhone} onChange={(e) => setEditablePhone(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="editAddress">Address</Label>
                  <Textarea id="editAddress" value={editableAddress} onChange={(e) => setEditableAddress(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveContactInfo}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <p className="flex items-start gap-2"><UserCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Name:</strong> {profile.name}</p>
            <p className="flex items-start gap-2"><Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Email:</strong> {profile.email}</p>
            <p className="flex items-start gap-2"><Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Phone:</strong> {profile.phone}</p>
            <p className="flex items-start gap-2"><Home className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Address:</strong> {profile.address}</p>
            <p className="flex items-start gap-2"><CalendarDaysIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Date of Birth:</strong> {profile.dob}</p>
            <p className="flex items-start gap-2"><GenderIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" /> <strong>Gender:</strong> {profile.gender}</p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleUpdatePassword}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Security Settings</CardTitle>
            <CardDescription>Manage your password and account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative mt-1">
                <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="currentPassword" type="password" placeholder="Enter current password" className="pl-8" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input id="confirmNewPassword" type="password" placeholder="Confirm new password" className="mt-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
             <Button type="submit">Update Password</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
