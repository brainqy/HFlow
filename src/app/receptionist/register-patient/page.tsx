
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function ReceptionistRegisterPatientPage() {
  return (
    <div className="space-y-8">
         <header>
            <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
                <UserPlus className="h-8 w-8" /> Register New Patient
            </h1>
            <p className="text-muted-foreground mt-1">
                Use this form to add new patients to the system.
            </p>
        </header>
        <Card className="w-full max-w-3xl mx-auto shadow-xl">
            <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">New Patient Registration</CardTitle>
            <CardDescription>
                Please fill in all required patient information accurately.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <RegistrationForm />
            </CardContent>
        </Card>
    </div>
  );
}
