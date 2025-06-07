
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, BadgeCheck, Languages, Briefcase, Clock, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function NurseProfilePage() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: 'Alex Miller, RN',
    email: 'alex.miller@healthflow.clinic',
    phone: '(123) 555-0456',
    department: 'General Ward',
    shift: 'Day Shift (7 AM - 7 PM)',
    certifications: 'Registered Nurse (RN), Basic Life Support (BLS), Pediatric Advanced Life Support (PALS)',
    skills: 'Patient assessment, medication administration, wound care, IV therapy, patient education, EMR charting, emergency response.'
  });

  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfessionalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editableProfile); // Update main profile state
    toast({title: "Profile Updated", description: "Your professional information has been saved."});
    setIsEditInfoOpen(false);
  }

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Password Changed", description: "Your password has been updated successfully."});
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> My Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account details, preferences, and professional information.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="font-headline text-xl">Professional Information</CardTitle>
              <CardDescription>Your contact and professional details.</CardDescription>
            </div>
            <Dialog open={isEditInfoOpen} onOpenChange={setIsEditInfoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setEditableProfile(profile)}><Edit className="mr-2 h-4 w-4"/>Edit Info</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Edit Professional Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveProfessionalInfo} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
                  <div><Label htmlFor="editName">Full Name & Credentials</Label><Input id="editName" name="name" value={editableProfile.name} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editDepartment">Department</Label><Input id="editDepartment" name="department" value={editableProfile.department} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editShift">Primary Shift</Label><Input id="editShift" name="shift" value={editableProfile.shift} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editEmail">Email Address</Label><Input id="editEmail" name="email" type="email" value={editableProfile.email} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editPhone">Phone Number</Label><Input id="editPhone" name="phone" type="tel" value={editableProfile.phone} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editCertifications">Certifications (Comma-separated)</Label><Input id="editCertifications" name="certifications" value={editableProfile.certifications} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="editSkills">Skills & Competencies</Label><Textarea id="editSkills" name="skills" value={editableProfile.skills} onChange={handleInputChange} className="min-h-[100px]" /></div>
                  <DialogFooter><Button type="submit">Save Changes</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <p><strong className="text-muted-foreground">Name:</strong> {profile.name}</p>
            <p><strong className="text-muted-foreground">Department:</strong> {profile.department}</p>
            <p><strong className="text-muted-foreground">Email:</strong> {profile.email}</p>
            <p><strong className="text-muted-foreground">Phone:</strong> {profile.phone}</p>
            <p><strong className="text-muted-foreground">Primary Shift:</strong> {profile.shift}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground mb-1 flex items-center gap-1"><BadgeCheck className="h-4 w-4"/>Certifications:</p>
            <p className="pl-1">{profile.certifications}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground mb-1 flex items-center gap-1"><Languages className="h-4 w-4"/>Skills & Competencies:</p>
            <p className="pl-1 whitespace-pre-line">{profile.skills}</p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleUpdatePassword}>
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
