
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { heroSlides } from "@/lib/placeholder-data"; // Import centralized slides
import type { HeroSlideItem } from "@/types"; // Ensure HeroSlideItem type is available

// Local heroSlides array is removed

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    }

    api.on("select", onSelect);
    api.on("reInit", onReInit); // Listen for reInit, useful if slides change

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  // Re-initialize count if heroSlides array changes (e.g. due to manager actions)
   React.useEffect(() => {
    if (api) {
      api.reInit(); // This should trigger onReInit to update count
    }
  }, [heroSlides, api]);


  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="h-full w-full"
        opts={{
          loop: heroSlides.length > 1, // Ensure loop considers the actual number of slides
        }}
      >
        <CarouselContent className="h-full">
          {heroSlides.map((slide, index) => ( // Add index for priority
            <CarouselItem key={slide.id} className="relative h-full w-full">
              <Image
                src={slide.imageUrl}
                alt={slide.altText}
                data-ai-hint={slide.dataAiHint}
                fill
                priority={index === 0} // Prioritize loading the first image
                style={{ objectFit: "cover" }}
                className="brightness-75" // Add a slight dimming for text readability
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 bg-black/30">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                  {slide.subtitle}
                </p>
                <div className="mt-10">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {heroSlides.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 text-white hover:bg-white/20 hover:text-white border-white/50" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 text-white hover:bg-white/20 hover:text-white border-white/50" />
          </>
        )}
      </Carousel>

      {count > 0 && heroSlides.length > 1 && ( // Only show dots if more than one slide
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              variant="outline"
              size="icon"
              className={cn(
                "h-2.5 w-2.5 rounded-full p-0 transition-all duration-300",
                current === index
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
