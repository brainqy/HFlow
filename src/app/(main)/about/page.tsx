import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About HealthFlow
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Dedicated to providing exceptional healthcare with a personal touch.
        </p>
      </header>

      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            HealthFlow was founded with a simple mission: to make high-quality healthcare accessible and patient-focused. We believe in a holistic approach to medicine, where technology and human compassion work hand-in-hand. Our journey began over a decade ago, driven by a passion to innovate and improve the well-being of our community.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, HealthFlow stands as a beacon of trust and excellence in the medical field. We continuously strive to enhance our services, adopt cutting-edge treatments, and foster a welcoming environment for all our patients.
          </p>
        </div>
        <div>
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="HealthFlow Clinic Building" 
            data-ai-hint="clinic building"
            width={600} 
            height={400} 
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-headline text-3xl font-semibold text-center text-foreground mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline">Compassion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We treat every patient with empathy, respect, and understanding.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Target className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline">Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We are committed to the highest standards of medical care and safety.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Eye className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline">Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We uphold honesty and ethical principles in all our interactions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold text-center text-foreground mb-10">Meet Our Team</h2>
        <p className="text-center text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Our diverse team of skilled professionals is the heart of HealthFlow. We work collaboratively to ensure you receive the best possible care.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: 'Dr. Alice Smith', role: 'Chief Medical Officer', imageHint: 'female doctor' },
            { name: 'Mark Johnson', role: 'Head of Nursing', imageHint: 'male nurse' },
            { name: 'Linda Chen', role: 'Practice Manager', imageHint: 'admin staff' },
            { name: 'Robert Brown', role: 'Lead Technician', imageHint: 'lab technician' },
          ].map((member) => (
            <Card key={member.name} className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image 
                  src="https://placehold.co/200x200.png" 
                  alt={member.name} 
                  data-ai-hint={member.imageHint}
                  width={120} 
                  height={120} 
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-headline text-lg font-medium text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
