
import { VisitingDoctorLoginForm } from '@/components/forms/VisitingDoctorLoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function VisitingDoctorLoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-12rem)] gap-12">
       <div className="w-full max-w-md lg:max-w-lg hidden lg:block">
         <Image 
            src="https://placehold.co/600x800.png" 
            alt="Doctor with a briefcase, ready to visit" 
            data-ai-hint="doctor briefcase professional"
            width={600} 
            height={800} 
            className="rounded-lg shadow-xl object-cover"
          />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Visiting Doctor Portal Login</CardTitle>
          <CardDescription>
            Access your assigned schedule and patient information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VisitingDoctorLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
