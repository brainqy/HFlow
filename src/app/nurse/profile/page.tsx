
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, BadgeCheck, Languages, Briefcase, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

export default function NurseProfilePage() {
  const { toast } = useToast();
  // Placeholder data - in a real app, this would come from a backend
  const nurseProfile = {
    name: 'Alex Miller, RN',
    email: 'alex.miller@healthflow.clinic',
    phone: '(123) 555-0456',
    department: 'General Ward',
    shift: 'Day Shift (7 AM - 7 PM)',
    certifications: ['Registered Nurse (RN)', 'Basic Life Support (BLS)', 'Pediatric Advanced Life Support (PALS)'],
    skills: 'Patient assessment, medication administration, wound care, IV therapy, patient education, EMR charting, emergency response.'
  };

  const handleSaveProfessionalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast({title: "Profile Updated", description: "Your professional information has been saved."});
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update
    toast({title: "Password Changed", description: "Your password has been updated successfully."});
  }


  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account details, preferences, and professional information.
        </p>
      </header>

      <form onSubmit={handleSaveProfessionalInfo}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Professional Information</CardTitle>
            <CardDescription>Update your contact and professional details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name & Credentials</Label>
                <Input id="name" defaultValue={nurseProfile.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="department" className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-muted-foreground" />Department</Label>
                <Input id="department" defaultValue={nurseProfile.department} className="mt-1 bg-muted/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="shift" className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground" />Primary Shift</Label>
                    <Input id="shift" defaultValue={nurseProfile.shift} className="mt-1" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="flex items-center gap-1"><Mail className="h-4 w-4 text-muted-foreground" />Email Address</Label>
                <Input id="email" type="email" defaultValue={nurseProfile.email} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-1"><Phone className="h-4 w-4 text-muted-foreground" />Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={nurseProfile.phone} className="mt-1" />
              </div>
            </div>

            <div>
                <Label htmlFor="certifications" className="flex items-center gap-1"><BadgeCheck className="h-4 w-4 text-muted-foreground"/> Certifications (Comma-separated)</Label>
                <Input id="certifications" defaultValue={nurseProfile.certifications.join(', ')} className="mt-1" />
            </div>
            <div>
                <Label htmlFor="skills" className="flex items-center gap-1"><Languages className="h-4 w-4 text-muted-foreground"/> Skills & Competencies</Label>
                <Textarea id="skills" defaultValue={nurseProfile.skills} className="mt-1 min-h-[100px]" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit">Save Professional Info</Button>
          </CardFooter>
        </Card>
      </form>

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
