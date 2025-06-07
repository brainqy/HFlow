
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Megaphone, CalendarCheck, HeartPulse } from "lucide-react";
import Link from "next/link";

interface PromoItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaHint?: string;
}

const promoItems: PromoItem[] = [
  {
    id: "promo1",
    icon: Megaphone,
    title: "New Telehealth Services Available!",
    description: "Consult with our expert doctors from the comfort of your home. Book your virtual appointment today.",
    ctaText: "Book Telehealth",
    ctaLink: "/appointments?service=telehealth",
    ctaHint: "telehealth consultation"
  },
  {
    id: "promo2",
    icon: CalendarCheck,
    title: "Easy Online Appointment Booking",
    description: "Skip the phone calls. Schedule your next visit with just a few clicks through our patient portal.",
    ctaText: "Book Now",
    ctaLink: "/appointments",
    ctaHint: "online schedule booking"
  },
  {
    id: "promo3",
    icon: HeartPulse,
    title: "Comprehensive Heart Health Checkups",
    description: "Specialized cardiac screening and consultations available. Prioritize your heart health.",
    ctaText: "Learn About Cardiology",
    ctaLink: "/services#cardiology", // Assuming a service ID or link to cardiology
    ctaHint: "heart health checkup"
  },
];

export default function PromoBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="py-8 md:py-12 bg-accent/5">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {promoItems.map((promo) => (
              <CarouselItem key={promo.id}>
                <div className="p-1">
                  <Card className="bg-accent text-accent-foreground shadow-xl overflow-hidden">
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <promo.icon className="h-10 w-10 md:h-12 md:w-12 text-accent-foreground/80 shrink-0" />
                        <div>
                          <h3 className="font-headline text-xl md:text-2xl font-semibold">
                            {promo.title}
                          </h3>
                          <p className="text-sm md:text-base text-accent-foreground/90 mt-1">
                            {promo.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        size="lg"
                        asChild
                        className="bg-background text-foreground hover:bg-background/90 mt-4 md:mt-0 shrink-0 w-full sm:w-auto"
                      >
                        <Link href={promo.ctaLink} data-ai-hint={promo.ctaHint || 'promotional link'}>{promo.ctaText}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
