
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, UserCog, BriefcaseMedical, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const portalOptions = [
  {
    title: 'Patient Portal',
    description: 'Access your medical records, appointments, and communicate with your care team.',
    href: '/login',
    icon: User,
    imageHint: 'patient portal mobile',
  },
  {
    title: 'Doctor Portal',
    description: 'Manage patient charts, appointments, and access clinical decision support tools.',
    href: '/doctor-login',
    icon: UserCog,
    imageHint: 'doctor interface tablet',
  },
  {
    title: 'Nurse Portal',
    description: 'View patient queues, record vitals, manage schedules, and access nursing tools.',
    href: '/nurse-login',
    icon: BriefcaseMedical,
    imageHint: 'nurse workflow digital',
  },
];

export default function PortalAccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Access Your Portal
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Please select your role to sign in to the appropriate HealthFlow portal.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {portalOptions.map((option) => (
          <Card key={option.title} className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-52 w-full bg-primary/10 flex items-center justify-center">
              {/* Placeholder for a more illustrative image or keep icon prominent */}
               <Image 
                src={`https://placehold.co/600x300.png`} 
                alt={`${option.title} Illustration`}
                data-ai-hint={option.imageHint}
                width={600} 
                height={300} 
                className="w-full h-full object-cover"
              />
              <option.icon className="absolute h-16 w-16 text-primary opacity-30" />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <option.icon className="h-6 w-6 text-primary" />
                {option.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base text-muted-foreground">
                {option.description}
              </CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href={option.href}>
                  Go to {option.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          New to HealthFlow? <Link href="/register" className="text-primary hover:underline">Create a patient account</Link>.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          For staff account creation, please contact administration.
        </p>
      </div>
    </div>
  );
}
