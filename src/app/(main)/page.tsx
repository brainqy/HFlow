
"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Stethoscope, Users, FileText, Building, Info, Bell } from 'lucide-react';
import Image from 'next/image';
import { placeholderServices, placeholderAnnouncements, placeholderTestimonials, placeholderBlogPosts, placeholderTrustSignals } from '@/lib/placeholder-data'; 
import { getServiceIcon } from '@/lib/icon-map';
import { useEffect, useState } from 'react';
import type { Service, Announcement, Testimonial, AnnouncementDisplayLocation, TrustSignal } from '@/types';
import { format } from 'date-fns';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import TrustSignals from '@/components/sections/TrustSignals';


const doctors = [
  { id: 'emily-carter', name: 'Dr. Emily Carter', specialty: 'Cardiologist', image: 'https://placehold.co/300x300.png', dataAiHint: 'doctor portrait' },
  { id: 'james-lee', name: 'Dr. James Lee', specialty: 'Neurologist', image: 'https://placehold.co/300x300.png', dataAiHint: 'physician smiling' },
  { id: 'sarah-green', name: 'Dr. Sarah Green', specialty: 'Orthopedic Surgeon', image: 'https://placehold.co/300x300.png', dataAiHint: 'surgeon friendly' },
];

export default function HomePageContent() {
  const [homePageServices, setHomePageServices] = useState<Service[]>([]);
  const [activeAnnouncements, setActiveAnnouncements] = useState<Announcement[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);


  useEffect(() => {
    // Filter for specific services to display on the homepage
    const servicesToDisplayNames = ['Cardiology', 'Neurology', 'Orthopedics'];
    const filteredServices = placeholderServices.filter(s => servicesToDisplayNames.includes(s.name));
    
    if (filteredServices.length < servicesToDisplayNames.length && placeholderServices.length > 0) {
        const fallbackServices = placeholderServices.slice(0, 3);
        const combined = [...new Map([...filteredServices, ...fallbackServices].map(item => [item['id'], item])).values()];
        setHomePageServices(combined.slice(0,3));
    } else {
      setHomePageServices(filteredServices.slice(0,3));
    }

    // Filter active announcements for homepage
    const now = new Date();
    const announcements = placeholderAnnouncements.filter(ann => {
      const isTargeted = ann.displayLocations.includes('homepage') || ann.displayLocations.includes('all_portals');
      const isActiveDate = ann.startDate <= now && (!ann.endDate || ann.endDate >= now);
      return isTargeted && isActiveDate;
    }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()); // Show newest first
    setActiveAnnouncements(announcements);
    
    // Load testimonials
    setTestimonials(placeholderTestimonials);
    setTrustSignals(placeholderTrustSignals);


  }, []);


  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
            Experience compassionate and expert healthcare at HealthFlow. We are dedicated to providing top-quality medical services to our community.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/appointments">Book an Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      {activeAnnouncements.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4">
              {activeAnnouncements.map(ann => (
                <Alert key={ann.id} className="shadow-md">
                  <Bell className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-headline text-lg text-primary">{ann.title}</AlertTitle>
                  <AlertDescription className="text-foreground/90">
                    {ann.content}
                    <p className="text-xs text-muted-foreground mt-1">
                      Posted: {format(new Date(ann.createdAt), "PPP")}
                      {ann.endDate && ` (Ends: ${format(new Date(ann.endDate), "PPP")})`}
                    </p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Our Services</h2>
          {homePageServices.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {homePageServices.map((service) => {
                const IconComponent = getServiceIcon(service.iconName);
                return (
                  <Card key={service.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <CardTitle className="font-headline">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="mt-4 text-primary">Learn More</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                              <IconComponent className="h-6 w-6" /> {service.name}
                            </DialogTitle>
                            <DialogDescription className="text-base pt-2 text-muted-foreground">
                              {service.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-foreground">
                            <p className="leading-relaxed">{service.details || 'More detailed information about this service will be available soon.'}</p>
                          </div>
                            {service.imageUrl && (
                              <Image 
                                src={service.imageUrl} 
                                alt={service.name} 
                                data-ai-hint={service.dataAiHint || "service illustration"}
                                width={400} 
                                height={250} 
                                className="rounded-md object-cover mx-auto mt-2"
                                />
                            )}
                          <Button asChild className="mt-6 w-full">
                            <Link href="/appointments">Book an Appointment</Link>
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
             ) : (
            <p className="text-muted-foreground text-center">Key services information coming soon. <Link href="/services" className="text-primary hover:underline">View all services</Link>.</p>
          )}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold text-foreground mb-6">Why Choose HealthFlow?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At HealthFlow, we combine state-of-the-art technology with a patient-first approach. Our dedicated team of professionals is committed to your well-being.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Stethoscope className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Experienced Doctors</h3>
                    <p className="text-muted-foreground text-sm">Board-certified specialists in various fields.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Patient-Centered Care</h3>
                    <p className="text-muted-foreground text-sm">Personalized treatment plans tailored to your needs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                   <Building className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Modern Facilities</h3>
                    <p className="text-muted-foreground text-sm">Equipped with the latest medical technology.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Smiling doctor with patient"
                data-ai-hint="doctor patient" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">What Our Patients Say</h2>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Trust Signals Section */}
      {trustSignals.length > 0 && <TrustSignals signals={trustSignals} />}

      {/* Meet Our Doctors Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Meet Our Doctors</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image src={doctor.image} alt={doctor.name} data-ai-hint={doctor.dataAiHint} width={300} height={300} className="w-full h-56 object-cover" />
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl mb-1">{doctor.name}</CardTitle>
                  <CardDescription className="text-primary mb-3">{doctor.specialty}</CardDescription>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/doctors">All Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Latest Health Articles</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {placeholderBlogPosts.slice(0,3).map((post) => (
              <Card key={post.slug} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    data-ai-hint={post.dataAiHint || 'blog article'} 
                    width={600} 
                    height={400} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </Link>
                <CardHeader>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="font-headline text-lg hover:text-primary transition-colors">{post.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  <Button variant="link" asChild className="mt-2 p-0 text-primary">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
             {placeholderBlogPosts.length === 0 && (
              <p className="md:col-span-3 text-center text-muted-foreground">No blog posts available yet. Check back soon!</p>
            )}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
