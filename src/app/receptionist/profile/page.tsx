
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, Edit, BadgeInfo } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ReceptionistProfilePage() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: 'Sarah Bell',
    email: 'sarah.bell@healthflow.clinic',
    phone: '(123) 555-0789',
    employeeId: 'REC001',
  });

  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [editableEmail, setEditableEmail] = useState(profile.email);
  const [editablePhone, setEditablePhone] = useState(profile.phone);

  const handleSaveContactInfo = () => {
    setProfile(prev => ({ ...prev, email: editableEmail, phone: editablePhone }));
    toast({title: "Contact Info Updated", description: "Your contact information has been updated."});
    setIsEditContactOpen(false);
  };

  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Password Updated", description: "Your password has been changed successfully."});
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account details and preferences.
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
              <Button variant="outline" size="sm" onClick={() => { setEditableEmail(profile.email); setEditablePhone(profile.phone); }}>
                <Edit className="mr-2 h-4 w-4"/>Edit Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div><Label htmlFor="editEmail">Email Address</Label><Input id="editEmail" value={editableEmail} onChange={(e) => setEditableEmail(e.target.value)} /></div>
                <div><Label htmlFor="editPhone">Phone Number</Label><Input id="editPhone" value={editablePhone} onChange={(e) => setEditablePhone(e.target.value)} /></div>
              </div>
              <DialogFooter><Button onClick={handleSaveContactInfo}>Save Changes</Button></DialogFooter>
            </DialogContent>
          </Dialog>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <p><strong className="text-muted-foreground">Full Name:</strong> {profile.name}</p>
          <p><strong className="text-muted-foreground">Employee ID:</strong> {profile.employeeId}</p>
          <p className="flex items-center gap-1"><Mail className="h-4 w-4 text-muted-foreground shrink-0"/> {profile.email}</p>
          <p className="flex items-center gap-1"><Phone className="h-4 w-4 text-muted-foreground shrink-0"/> {profile.phone}</p>
        </div>
      </CardContent>
    </Card>

    <form onSubmit={handleSubmitPassword}>
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
