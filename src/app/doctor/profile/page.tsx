
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, CalendarDays, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { placeholderDoctors } from '@/lib/placeholder-data'; // Assuming current doctor can be identified
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function DoctorProfilePage() {
  const { toast } = useToast();
  // Placeholder: In a real app, you'd get the logged-in doctor's ID and fetch their data.
  // For this example, we'll use the first doctor from the placeholder data.
  const doctorProfile = placeholderDoctors.find(doc => doc.id === 'emily-carter') || placeholderDoctors[0];


  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Collect data from form
    toast({title: "Profile Updated", description: "Your personal information has been saved."});
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Password Changed", description: "Your password has been updated successfully."});
  };
  
  const handleRequestAvailabilityChange = () => {
    toast({
      title: "Availability Change Requested",
      description: "Your request to update availability has been noted. (Full feature coming soon)"
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <UserCog className="h-8 w-8" /> Profile Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account details and preferences.
        </p>
      </header>

      <form onSubmit={handleSaveChanges}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Personal Information</CardTitle>
            <CardDescription>Update your personal and contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={doctorProfile.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" defaultValue={doctorProfile.specialty} readOnly className="mt-1 bg-muted/50" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center mt-1">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input id="email" type="email" defaultValue={doctorProfile.email} />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center mt-1">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input id="phone" type="tel" defaultValue={"(123) 555-0123"} /> {/* Placeholder phone if not in data */}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
             <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" /> My Availability
          </CardTitle>
          <CardDescription>Your current weekly schedule. Contact admin to make changes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {doctorProfile.availability && Object.keys(doctorProfile.availability).length > 0 ? (
            Object.entries(doctorProfile.availability).map(([day, times]) => (
              <div key={day} className="text-sm">
                <p className="font-semibold text-foreground">{day}</p>
                {times.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {times.map((time, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {time}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">Not available</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No availability set. Please contact administration.</p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button variant="outline" onClick={handleRequestAvailabilityChange}>Request Availability Change</Button>
        </CardFooter>
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
