
"use client";
import { placeholderDoctors } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, GraduationCap, BriefcaseMedical, Stethoscope, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; 
import type { AvailabilitySlot, Doctor } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Removed generateStaticParams as doctors are now dynamic

const groupAvailabilityByDay = (availability: AvailabilitySlot[] = []) => {
  return availability.reduce((acc, slot) => {
    (acc[slot.day] = acc[slot.day] || []).push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);
};

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = typeof params.id === 'string' ? params.id : '';
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctorId) {
      // Find doctor from the (potentially mutated) placeholderDoctors
      const foundDoctor = placeholderDoctors.find((d) => d.id === doctorId);
      setDoctor(foundDoctor);
    }
    setLoading(false);
  }, [doctorId]);

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Loading doctor profile...</div>;
  }
  
  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 text-center">
        <h1 className="font-headline text-3xl text-destructive mb-4">Doctor Not Found</h1>
        <p className="text-muted-foreground mb-6">The doctor profile you are looking for does not exist or may have been moved.</p>
        <Button variant="outline" asChild>
            <Link href="/doctors" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Doctors List
            </Link>
          </Button>
      </div>
    );
  }

  const groupedAvailability = groupAvailabilityByDay(doctor.availability);
  const sortedDays = Object.keys(groupedAvailability).sort((a, b) => {
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOrder.indexOf(a) - daysOrder.indexOf(b);
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <Button variant="outline" asChild className="mb-6">
          <Link href="/doctors" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Doctors List
          </Link>
      </Button>
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative h-80 w-full md:h-96">
              <Image 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                style={{objectFit:"cover"}}
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
                <Link href="tel:+1234567890"> {/* Placeholder number */}
                  <Phone className="h-4 w-4" /> Call Clinic
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-foreground">About Dr. {doctor.name.split(' ').pop()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">{doctor.bio}</p>

              <div className="mb-6">
                <h3 className="font-headline text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" /> Education &amp; Qualifications
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

          {doctor.availability && sortedDays.length > 0 && (
            <Card className="mt-8 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground flex items-center gap-2">
                  <CalendarDays className="h-6 w-6 text-primary" /> Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sortedDays.map((day) => (
                    <div key={day} className="flex items-start gap-4">
                      <span className="font-semibold text-foreground w-24 shrink-0">{day}:</span>
                      <div className="flex flex-wrap gap-2">
                        {groupedAvailability[day]
                          .sort((a, b) => a.startTime.localeCompare(b.startTime)) 
                          .map((slot, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {slot.startTime} - {slot.endTime}
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
