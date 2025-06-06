import { LoginForm } from '@/components/forms/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-12rem)] gap-12">
      <div className="w-full max-w-md lg:max-w-lg hidden lg:block">
         <Image 
            src="https://placehold.co/600x800.png" 
            alt="Doctor interacting with patient on tablet" 
            data-ai-hint="doctor patient technology"
            width={600} 
            height={800} 
            className="rounded-lg shadow-xl object-cover"
          />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Patient Portal Login</CardTitle>
          <CardDescription>
            Access your medical records, appointments, and more.
            New here? <Link href="/register" className="text-primary hover:underline">Create an account</Link>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
