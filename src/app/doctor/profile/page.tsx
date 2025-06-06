
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserCog, Mail, Phone, KeyRound, CalendarDays, Clock, Users, Edit, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { placeholderDoctors } from '@/lib/placeholder-data'; 
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import type { AvailabilitySlot } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function DoctorProfilePage() {
  const { toast } = useToast();
  const doctorProfile = placeholderDoctors.find(doc => doc.id === 'emily-carter') || placeholderDoctors[0];
  const [isAvailabilityDialogOpen, setIsAvailabilityDialogOpen] = useState(false);
  const [availabilityRequest, setAvailabilityRequest] = useState('');


  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Profile Updated", description: "Your personal information has been saved."});
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Password Changed", description: "Your password has been updated successfully."});
  };
  
  const handleSubmitAvailabilityRequest = () => {
    if (availabilityRequest.trim() === "") {
      toast({
        title: "Request Empty",
        description: "Please describe your desired availability changes.",
        variant: "destructive",
      });
      return;
    }
    console.log("Availability Change Request Submitted:", availabilityRequest);
    toast({
      title: "Availability Change Requested",
      description: "Your request has been submitted and is pending review by an administrator."
    });
    setAvailabilityRequest('');
    setIsAvailabilityDialogOpen(false);
  };

  const groupAvailabilityByDay = (availability: AvailabilitySlot[] = []) => {
    return availability.reduce((acc, slot) => {
      (acc[slot.day] = acc[slot.day] || []).push(slot);
      return acc;
    }, {} as Record<string, AvailabilitySlot[]>);
  };

  const groupedAvailability = groupAvailabilityByDay(doctorProfile.availability);
  const sortedDays = Object.keys(groupedAvailability).sort((a, b) => {
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOrder.indexOf(a) - daysOrder.indexOf(b);
  });


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
          <CardDescription>Your current weekly schedule including time slots and patient capacity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedDays.length > 0 ? (
            sortedDays.map((day) => (
              <div key={day} className="text-sm">
                <p className="font-semibold text-foreground text-md mb-1">{day}</p>
                {groupedAvailability[day].length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {groupedAvailability[day]
                      .sort((a,b) => a.startTime.localeCompare(b.startTime))
                      .map((slot, index) => (
                      <Badge key={index} variant="secondary" className="flex flex-col items-start p-2 h-auto">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs">
                            <Users className="h-3 w-3" /> Max Patients: {slot.maxPatients}
                        </div>
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
          <Dialog open={isAvailabilityDialogOpen} onOpenChange={setIsAvailabilityDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><Edit className="mr-2 h-4 w-4" />Request Availability Change</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle className="font-headline text-xl flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" /> Request Availability Change
                </DialogTitle>
                <DialogDescription>
                  Review your current schedule and describe the changes you'd like to request. Your request will be sent to an administrator for review.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Current Availability:</h3>
                  <div className="space-y-3 p-3 border rounded-md bg-muted/50">
                    {sortedDays.length > 0 ? (
                      sortedDays.map((day) => (
                        <div key={day} className="text-xs">
                          <p className="font-medium text-foreground mb-0.5">{day}</p>
                          {groupedAvailability[day].length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {groupedAvailability[day]
                                .sort((a,b) => a.startTime.localeCompare(b.startTime))
                                .map((slot, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {slot.startTime} - {slot.endTime} (Max: {slot.maxPatients})
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground italic">Not available</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-xs">No availability currently set.</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="availabilityRequest" className="font-medium">Describe your requested changes:</Label>
                  <Textarea
                    id="availabilityRequest"
                    value={availabilityRequest}
                    onChange={(e) => setAvailabilityRequest(e.target.value)}
                    placeholder="e.g., 'Please add a slot on Tuesdays from 2 PM to 4 PM for 5 patients. Also, remove my Wednesday 9 AM slot.'"
                    className="mt-1 min-h-[120px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmitAvailabilityRequest}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
