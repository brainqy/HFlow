
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
  type CarouselApi, // Import CarouselApi type
} from "@/components/ui/carousel";
import { Megaphone, CalendarCheck, HeartPulse, Award } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    ctaLink: "/services#cardiology", 
    ctaHint: "heart health checkup"
  },
  {
    id: "promo4",
    icon: Award,
    title: "Award-Winning Patient Care",
    description: "Recognized for excellence in patient satisfaction and medical outcomes. Experience the HealthFlow difference.",
    ctaText: "About Our Awards",
    ctaLink: "/about#awards",
    ctaHint: "clinic awards recognition"
  }
];

export default function PromoBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    const onReInit = () => {
      setSlideCount(api.scrollSnapList().length);
      setCurrentSlide(api.selectedScrollSnap());
    }

    api.on("select", onSelect);
    api.on("reInit", onReInit);


    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="py-8 md:py-12 bg-accent/5 relative"> {/* Added relative for dot positioning */}
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          setApi={setApi} // Pass setApi to the Carousel component
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
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[160px] md:min-h-[120px]">
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
            <CarouselPrevious className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2" />
          </div>
          
          {slideCount > 0 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {Array.from({ length: slideCount }).map((_, index) => (
                <Button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full p-0 transition-colors",
                    currentSlide === index
                      ? "bg-primary border-primary opacity-100"
                      : "bg-muted border-muted opacity-50 hover:opacity-75"
                  )}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
