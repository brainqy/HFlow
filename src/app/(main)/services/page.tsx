import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Stethoscope, Syringe, Pill, Microscope, HeartPulse, Bone, Brain, Baby } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const servicesList = [
  { name: 'General Checkups', icon: Stethoscope, description: 'Routine health examinations and preventive care for all ages.', imageHint: 'doctor patient checkup' },
  { name: 'Vaccinations', icon: Syringe, description: 'Comprehensive immunization services for children and adults.', imageHint: 'vaccination arm' },
  { name: 'Chronic Disease Management', icon: Activity, description: 'Ongoing care and support for managing chronic conditions like diabetes and hypertension.', imageHint: 'health monitoring' },
  { name: 'Cardiology', icon: HeartPulse, description: 'Specialized heart care, including ECG, stress tests, and consultations.', imageHint: 'heart EKG' },
  { name: 'Orthopedics', icon: Bone, description: 'Diagnosis and treatment of musculoskeletal injuries and conditions.', imageHint: 'x-ray joint' },
  { name: 'Neurology', icon: Brain, description: 'Care for disorders of the nervous system, including migraines and neuropathy.', imageHint: 'brain MRI' },
  { name: 'Pediatrics', icon: Baby, description: 'Comprehensive healthcare for infants, children, and adolescents.', imageHint: 'child doctor' },
  { name: 'Lab Services', icon: Microscope, description: 'On-site laboratory for quick and accurate diagnostic testing.', imageHint: 'lab tests' },
  { name: 'Pharmacy Services', icon: Pill, description: 'Convenient on-site pharmacy for prescriptions and medication counseling.', imageHint: 'pharmacy counter' },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Our Medical Services
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Comprehensive care for you and your family, delivered by experienced professionals.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {servicesList.map((service) => (
          <Card key={service.name} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <service.icon className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image 
                src={`https://placehold.co/600x300.png`} 
                alt={service.name}
                data-ai-hint={service.imageHint}
                width={600} 
                height={300} 
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <CardDescription className="text-base text-muted-foreground mb-4">
                {service.description}
              </CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full">
                <Link href="/appointments">Book Appointment</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-16 py-12 bg-slate-50 rounded-lg">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground mb-6">
            Not Sure What You Need?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Our team is here to help. Contact us for a consultation, and we'll guide you to the right service.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
