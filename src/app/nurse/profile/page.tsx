
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, BadgeCheck, Languages } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function NurseProfilePage() {
  // Placeholder data - in a real app, this would come from a backend
  const nurseProfile = {
    name: 'Alex Miller, RN',
    email: 'alex.miller@healthflow.clinic',
    phone: '(123) 555-0456',
    department: 'General Ward',
    shift: 'Day Shift (7 AM - 7 PM)',
    certifications: ['Registered Nurse (RN)', 'Basic Life Support (BLS)'],
    skills: 'Patient assessment, medication administration, wound care, IV therapy, patient education, EMR charting.'
  };

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
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={nurseProfile.department} readOnly className="mt-1 bg-muted/50" />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="shift">Primary Shift</Label>
              <Input id="shift" defaultValue={nurseProfile.shift} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center mt-1">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="email" type="email" defaultValue={nurseProfile.email} />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center mt-1">
                <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="phone" type="tel" defaultValue={nurseProfile.phone} />
              </div>
            </div>
          </div>

           <div>
              <Label htmlFor="certifications" className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-muted-foreground"/> Certifications (Comma-separated)</Label>
              <Input id="certifications" defaultValue={nurseProfile.certifications.join(', ')} className="mt-1" />
            </div>
            <div>
                <Label htmlFor="skills" className="flex items-center gap-2"><Languages className="h-5 w-5 text-muted-foreground"/> Skills & Competencies</Label>
                <Textarea id="skills" defaultValue={nurseProfile.skills} className="mt-1 min-h-[100px]" />
            </div>

          <div className="pt-4 border-t">
             <Button>Save Professional Info</Button>
          </div>
        </CardContent>
      </Card>

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
           <div className="pt-4 border-t">
             <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
       <p className="text-sm text-muted-foreground text-center">
        These are placeholder pages. Full functionality will be implemented later.
      </p>
    </div>
  );
}
