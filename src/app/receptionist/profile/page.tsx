
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

export default function ReceptionistProfilePage() {
  const { toast } = useToast();
  // Placeholder data - in a real app, this would come from a backend
  const receptionistProfile = {
    name: 'Sarah Bell',
    email: 'sarah.bell@healthflow.clinic',
    phone: '(123) 555-0789',
    employeeId: 'REC001',
  };

  const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Profile Saved", description: "Your personal information has been updated."});
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

    <form onSubmit={handleSubmitProfile}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Personal Information</CardTitle>
          <CardDescription>Update your personal and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={receptionistProfile.name} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" defaultValue={receptionistProfile.employeeId} readOnly className="mt-1 bg-muted/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center mt-1">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="email" type="email" defaultValue={receptionistProfile.email} />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center mt-1">
                <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="phone" type="tel" defaultValue={receptionistProfile.phone} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>

    <form onSubmit={handleSubmitPassword}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Security Settings</CardTitle>
          <CardDescription>Manage your password and account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="flex items-center mt-1">
              <KeyRound className="h-5 w-5 text-muted-foreground mr-2" />
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
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
