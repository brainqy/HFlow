
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Settings, Briefcase, Info, ShieldCheck, Palette, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";

export default function ManagerSettingsPage() {
  const { toast } = useToast();

  // Placeholder data for settings
  const clinicSettings = {
    clinicName: "HealthFlow Central Clinic",
    address: "123 Health St, Wellness City, CA 90210",
    contactEmail: "contact@healthflow.clinic", 
    contactPhone: "(123) 456-7890",
    maintenanceMode: false,
    emailNotificationsEnabled: true, // Added for prototype
  };

  const handleSubmitGeneral = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, collect data and send to backend
    toast({title: "Settings Saved", description: "General clinic settings have been updated."});
  };
  
  const handleSubmitBranding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({title: "Branding Updated", description: "Theme and branding settings have been saved."});
  };

  const handleSystemConfigSave = () => {
    // In a real app, collect data from switches and send to backend
    const maintenanceMode = (document.getElementById('maintenanceMode') as HTMLButtonElement)?.dataset.state === 'checked';
    const emailNotifications = (document.getElementById('notifications') as HTMLButtonElement)?.dataset.state === 'checked';
    console.log("System Config to Save:", { maintenanceMode, emailNotifications });
    toast({title: "System Config Saved", description: "System configurations have been updated."});
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <Settings className="h-8 w-8" /> Clinic & System Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage general clinic information, branding, and system configurations.
        </p>
      </header>

      <form onSubmit={handleSubmitGeneral}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> General Clinic Information</CardTitle>
            <CardDescription>Update basic details about the clinic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input id="clinicName" defaultValue={clinicSettings.clinicName} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={clinicSettings.address} className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue={clinicSettings.contactEmail} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" type="tel" defaultValue={clinicSettings.contactPhone} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="welcomeMessage">Patient Portal Welcome Message</Label>
              <Textarea id="welcomeMessage" placeholder="Welcome to your patient portal..." className="mt-1 min-h-[80px]" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit">Save General Settings</Button>
          </CardFooter>
        </Card>
      </form>

      <form onSubmit={handleSubmitBranding}>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Branding & Theme</CardTitle>
                <CardDescription>Customize the appearance of the application (placeholders).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <Input id="primaryColor" type="color" defaultValue="#3498db" className="mt-1 h-10" />
                    </div>
                    <div>
                        <Label htmlFor="logoUpload">Clinic Logo</Label>
                        <Input id="logoUpload" type="file" className="mt-1" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button type="submit">Save Branding</Button>
            </CardFooter>
        </Card>
      </form>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> System Configuration</CardTitle>
          <CardDescription>Manage system-wide settings like maintenance mode and notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="maintenanceMode" className="font-medium">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily disable access for non-manager users.
              </p>
            </div>
            <Switch id="maintenanceMode" defaultChecked={clinicSettings.maintenanceMode} />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="notifications" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable system-wide email notifications.
              </p>
            </div>
            <Switch id="notifications" defaultChecked={clinicSettings.emailNotificationsEnabled} />
          </div>
        </CardContent>
         <CardFooter className="border-t pt-6">
            <Button onClick={handleSystemConfigSave}>Save System Config</Button>
          </CardFooter>
      </Card>
    </div>
  );
}
