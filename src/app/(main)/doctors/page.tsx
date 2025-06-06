import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDoctors } from '@/lib/placeholder-data';
import { Stethoscope, BriefcaseMedical, GraduationCap } from 'lucide-react';

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Meet Our Dedicated Doctors
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Our team of experienced and compassionate doctors is here to provide you with the best possible care.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {placeholderDoctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full">
              <Image 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={doctor.dataAiHint || 'doctor professional'}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{doctor.name}</CardTitle>
              <CardDescription className="text-primary text-md font-medium flex items-center gap-2">
                <Stethoscope className="h-5 w-5" /> {doctor.specialty}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{doctor.bio}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground"><strong>Education:</strong> {doctor.education[0]}</span>
                </div>
                <div className="flex items-start gap-2">
                  <BriefcaseMedical className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                   <span className="text-muted-foreground"><strong>Experience:</strong> {doctor.experience[0]}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/doctors/${doctor.id}`}>View Full Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
