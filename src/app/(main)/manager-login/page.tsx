
import { ManagerLoginForm } from '@/components/forms/ManagerLoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ManagerLoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-12rem)] gap-12">
       <div className="w-full max-w-md lg:max-w-lg hidden lg:block">
         <Image 
            src="https://placehold.co/600x800.png" 
            alt="Manager dashboard interface" 
            data-ai-hint="manager dashboard interface"
            width={600} 
            height={800} 
            className="rounded-lg shadow-xl object-cover"
          />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Manager Portal Login</CardTitle>
          <CardDescription>
            Access management tools and site operational features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ManagerLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
