import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Create Your HealthFlow Account</CardTitle>
          <CardDescription>
            Join our patient community for easy access to your health information and appointments.
            Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
      </Card>
    </div>
  );
}
