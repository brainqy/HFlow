
"use client"; 

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderServices } from '@/lib/placeholder-data'; // Will use the mutable array
import { getServiceIcon } from '@/lib/icon-map'; 
import { useEffect, useState } from 'react';
import type { Service } from '@/types';

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState<Service[]>([]);

  useEffect(() => {
    // Simulates fetching or observing the mutable placeholderServices array
    setServicesList([...placeholderServices]);
  }, []); 


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

      {servicesList.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => {
            const IconComponent = getServiceIcon(service.iconName);
            return (
              <Card key={service.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Image 
                    src={service.imageUrl || `https://placehold.co/600x300.png`} 
                    alt={service.name}
                    data-ai-hint={service.dataAiHint || "medical service illustration"}
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
            );
          })}
        </div>
      ) : (
         <div className="text-center py-10">
          <h2 className="font-headline text-2xl text-foreground mb-4">No Services Available</h2>
          <p className="text-muted-foreground">Please check back later or contact us for more information.</p>
        </div>
      )}


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
