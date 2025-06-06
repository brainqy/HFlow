
import { placeholderDoctors } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, GraduationCap, BriefcaseMedical, Stethoscope, Phone } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Import official Badge

export async function generateStaticParams() {
  return placeholderDoctors.map((doctor) => ({
    id: doctor.id,
  }));
}

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = placeholderDoctors.find((d) => d.id === params.id);

  if (!doctor) {
    return <div className="container mx-auto py-12 text-center">Doctor not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column - Doctor Image and Basic Info */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative h-80 w-full md:h-96">
              <Image 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={doctor.dataAiHint || 'doctor professional portrait'}
              />
            </div>
            <CardContent className="p-6">
              <h1 className="font-headline text-3xl font-bold text-primary">{doctor.name}</h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2 mt-1">
                <Stethoscope className="h-5 w-5 text-primary" /> {doctor.specialty}
              </p>
              <Button asChild className="w-full mt-6">
                <Link href={`/appointments?doctorId=${doctor.id}`}>Book Appointment</Link>
              </Button>
               <Button variant="outline" asChild className="w-full mt-2 flex items-center gap-2">
                <Link href="tel:+1234567890">
                  <Phone className="h-4 w-4" /> Call Clinic
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-foreground">About Dr. {doctor.name.split(' ').pop()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{doctor.bio}</p>

              <div className="mb-6">
                <h3 className="font-headline text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" /> Education & Qualifications
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {doctor.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-headline text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BriefcaseMedical className="h-6 w-6 text-primary" /> Professional Experience
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {doctor.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {doctor.availability && (
            <Card className="mt-8 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground flex items-center gap-2">
                  <CalendarDays className="h-6 w-6 text-primary" /> Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(doctor.availability).map(([day, times]) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="font-semibold text-foreground w-20">{day}:</span>
                      <div className="flex flex-wrap gap-2">
                        {times.map((time, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Availability subject to change. Please confirm when booking.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
