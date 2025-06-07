
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, KeyRound, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ManagerProfilePage() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: 'Manager User',
    email: 'manager@example.com',
  });

  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editableProfile);
    toast({title: "Profile Updated", description: "Your personal information has been saved."});
    setIsEditInfoOpen(false);
  };

  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Password Updated", description: "Your password has been changed successfully (mocked)."});
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal account details.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="font-headline text-xl">Account Information</CardTitle>
            <CardDescription>Your name and email address.</CardDescription>
          </div>
           <Dialog open={isEditInfoOpen} onOpenChange={setIsEditInfoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setEditableProfile(profile)}><Edit className="mr-2 h-4 w-4"/>Edit Info</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Account Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveInfo} className="space-y-4 py-2">
                  <div><Label htmlFor="editName">Full Name</Label><Input id="editName" name="name" value={editableProfile.name} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editEmail">Email Address</Label><Input id="editEmail" name="email" type="email" value={editableProfile.email} onChange={handleInputChange} /></div>
                  <DialogFooter><Button type="submit">Save Changes</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong className="text-muted-foreground">Name:</strong> {profile.name}</p>
          <p className="flex items-center gap-1"><Mail className="h-4 w-4 text-muted-foreground shrink-0"/> <strong className="text-muted-foreground">Email:</strong> {profile.email}</p>
        </CardContent>
      </Card>

    <form onSubmit={handleSubmitPassword}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Security Settings</CardTitle>
          <CardDescription>Manage your password.</CardDescription>
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
