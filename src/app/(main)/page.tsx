
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Stethoscope, Users, FileText, Building, Info, Bell, Hospital, Lightbulb, UserCheck, CheckSquare, Microscope as LabIcon, DoorOpen as EntranceIcon, ConciergeBell as ReceptionIcon } from 'lucide-react';
import Image from 'next/image';
import { placeholderServices, placeholderAnnouncements, placeholderTestimonials, placeholderBlogPosts, placeholderTrustSignals, homepageWidgetSettings as globalHomepageWidgetSettings } from '@/lib/placeholder-data';
import { getServiceIcon } from '@/lib/icon-map';
import { useEffect, useState } from 'react';
import type { Service, Announcement, Testimonial, AnnouncementDisplayLocation, TrustSignal, HomepageWidgetSetting } from '@/types';
import { format } from 'date-fns';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import TrustSignals from '@/components/sections/TrustSignals';
import PromoBanner from '@/components/sections/PromoBanner';

// Removed local 'doctors' array as the section is now a CTA banner

// Subset of specialized services for the new grid
const specializedServicesToShow: Service[] = placeholderServices.filter(s => ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Gastroenterology', 'General Surgery', 'IVF', 'Nephrology', 'Critical Care'].includes(s.name)).slice(0, 12);


export default function HomePageContent() {
  const [homePageServices, setHomePageServices] = useState<Service[]>([]);
  const [activeAnnouncements, setActiveAnnouncements] = useState<Announcement[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);
  const [widgetSettings, setWidgetSettings] = useState<HomepageWidgetSetting[]>([]);


  useEffect(() => {
    setWidgetSettings([...globalHomepageWidgetSettings]);

    const servicesToDisplayNames = ['Cardiology', 'Neurology', 'Orthopedics']; // Main services for the "Our Services" section
    const filteredServices = placeholderServices.filter(s => servicesToDisplayNames.includes(s.name));

    if (filteredServices.length < servicesToDisplayNames.length && placeholderServices.length > 0) {
        const fallbackServices = placeholderServices.slice(0, 3);
        const combined = [...new Map([...filteredServices, ...fallbackServices].map(item => [item['id'], item])).values()];
        setHomePageServices(combined.slice(0,3));
    } else {
      setHomePageServices(filteredServices.slice(0,3));
    }

    const now = new Date();
    const announcements = placeholderAnnouncements.filter(ann => {
      const isTargeted = ann.displayLocations.includes('homepage') || ann.displayLocations.includes('all_portals');
      const isActiveDate = ann.startDate <= now && (!ann.endDate || ann.endDate >= now);
      return isTargeted && isActiveDate;
    }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
    setActiveAnnouncements(announcements);

    setTestimonials(placeholderTestimonials);
    setTrustSignals(placeholderTrustSignals);
  }, []);

  const isWidgetVisible = (widgetId: string): boolean => {
    const setting = widgetSettings.find(s => s.id === widgetId);
    return setting ? setting.isVisible : true;
  };


  return (
    <>
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

      {isWidgetVisible('announcements') && activeAnnouncements.length > 0 && (
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

      {isWidgetVisible('promoBanner') && <PromoBanner />}

      {isWidgetVisible('services') && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Our Core Services</h2>
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
      )}

      {isWidgetVisible('specializedServices') && specializedServicesToShow.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-2 text-foreground">Explore Specialized Services</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              HealthFlow offers a wide range of specialized medical services to cater to your unique health needs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {specializedServicesToShow.map((service) => {
                const IconComponent = getServiceIcon(service.iconName);
                return (
                  <Card key={service.id} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center p-4 aspect-square">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-sm md:text-base">{service.name}</CardTitle>
                  </Card>
                );
              })}
            </div>
             <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {isWidgetVisible('whyChooseOurHospital') && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Why Choose HealthFlow Hospital?</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="font-headline text-2xl font-semibold text-primary mb-4">A Legacy of Care & Innovation</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  HealthFlow Hospital was founded over 50 years ago with a singular vision: to provide exceptional, patient-centered care to our community. From our humble beginnings as a local clinic, we've grown into a leading healthcare institution, consistently adopting cutting-edge technology and medical advancements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team of renowned physicians and dedicated staff are committed to upholding the highest standards of medical excellence and compassionate service. We believe in a holistic approach to health, addressing not just the illness but the overall well-being of every individual who walks through our doors.
                </p>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="HealthFlow Hospital Building Exterior"
                  data-ai-hint="modern hospital building"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {[
                { title: "State-of-the-Art Labs", imageHint: "hospital laboratory", icon: LabIcon },
                { title: "Welcoming Reception", imageHint: "clinic reception area", icon: ReceptionIcon },
                { title: "Modern Facilities", imageHint: "hospital entrance", icon: EntranceIcon },
              ].map(item => (
                <Card key={item.title} className="overflow-hidden shadow-lg">
                   <div className="relative h-56 w-full">
                    <Image src="https://placehold.co/600x300.png" alt={item.title} data-ai-hint={item.imageHint} fill style={{objectFit: "cover"}} />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                      <item.icon className="h-6 w-6 text-primary"/>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Our {item.title.toLowerCase()} are equipped with the latest technology and designed for patient comfort and efficiency.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {isWidgetVisible('whyChooseUs') && (
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
                    <UserCheck className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Experienced Doctors</h3>
                      <p className="text-muted-foreground text-sm">Board-certified specialists in various fields.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Innovative Treatments</h3>
                      <p className="text-muted-foreground text-sm">Access to the latest medical advancements and techniques.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckSquare className="h-6 w-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Comprehensive Care</h3>
                      <p className="text-muted-foreground text-sm">A full spectrum of services from prevention to specialized care.</p>
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
      )}

      {isWidgetVisible('testimonials') && testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">What Our Patients Say</h2>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>
      )}

      {isWidgetVisible('trustSignals') && trustSignals.length > 0 && <TrustSignals signals={trustSignals} />}

      {isWidgetVisible('meetOurDoctors') && (
         <section className="bg-primary text-primary-foreground py-16 md:py-20 rounded-lg my-12 md:my-16">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Meet Our Most Experienced Doctors</h2>
              <p className="text-lg text-primary-foreground/90">Our Experienced Medical Team: Your Partners in Health</p>
              <Button variant="secondary" size="lg" asChild className="mt-4 hover:bg-secondary/90">
                <Link href="/doctors">Meet Our Team</Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-auto md:min-h-[300px] flex justify-center md:justify-end items-center">
              <Image 
                src="https://placehold.co/500x350.png" 
                alt="Team of experienced doctors"
                data-ai-hint="doctor team group"
                width={500} 
                height={350}
                className="rounded-md object-cover shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {isWidgetVisible('blogPreview') && (
        <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Latest Health Articles</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> {/* This grid will wrap 5 items naturally */}
              {placeholderBlogPosts.slice(0,5).map((post) => (
                <Card key={post.slug} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        data-ai-hint={post.dataAiHint || 'blog article'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{objectFit:"cover"}}
                        className="rounded-t-lg"
                      />
                    </div>
                  </Link>
                  <CardHeader>
                    <Link href={`/blog/${post.slug}`}>
                      <CardTitle className="font-headline text-lg hover:text-primary transition-colors">{post.title}</CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="p-0 text-primary">
                      <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                    </Button>
                  </CardFooter>
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
      )}
    </>
  );
}
