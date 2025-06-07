
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, PlayCircle, Star } from "lucide-react"
import Link from "next/link"

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center mb-3", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-5 w-5",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
};

const TestimonialCardDisplay = ({ testimonial, type }: { testimonial: Testimonial; type: 'video' | 'text' }) => {
  return (
    <Card className="shadow-xl overflow-hidden bg-card h-full flex flex-col w-full max-w-lg mx-auto">
      <CardContent className="flex flex-col items-center justify-start p-6 md:p-8 text-center relative flex-grow min-h-[320px]">
        {testimonial.rating && <StarRating rating={testimonial.rating} />}

        {type === 'video' && testimonial.videoUrl && testimonial.videoPlaceholderImageUrl ? (
          <div className="flex flex-col items-center w-full mb-4">
            <div className="relative group w-full aspect-video">
              <Image
                src={testimonial.videoPlaceholderImageUrl}
                alt={`Video testimonial from ${testimonial.authorName}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg shadow-md"
                data-ai-hint="video testimonial placeholder"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300 rounded-lg">
                <Link href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch video testimonial from ${testimonial.authorName}`}>
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors duration-300" />
                </Link>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Click to watch video testimonial</p>
          </div>
        ) : (
          <>
            <Quote className="h-8 w-8 md:h-10 md:w-10 text-primary/30 mb-3" />
            <p className="text-base md:text-lg font-medium text-foreground/90 leading-relaxed mb-4 flex-grow">
              {testimonial.quote}
            </p>
          </>
        )}

        <div className="flex flex-col items-center mt-auto pt-4 border-t border-border/50 w-full">
          {testimonial.authorImageUrl && (
             <Avatar className="h-14 w-14 mb-2 shrink-0">
               <AvatarImage src={testimonial.authorImageUrl} alt={testimonial.authorName} data-ai-hint={testimonial.dataAiHint || 'person photo'} />
               <AvatarFallback>{testimonial.authorName.substring(0,1)}</AvatarFallback>
             </Avatar>
          )}
          <div>
            <p className="text-md font-semibold text-primary">{testimonial.authorName}</p>
            <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const videoTestimonials = testimonials.filter(t => t.videoUrl && t.videoPlaceholderImageUrl);
  const textTestimonials = testimonials.filter(t => !(t.videoUrl && t.videoPlaceholderImageUrl));

  const pairedItemsCount = Math.max(videoTestimonials.length, textTestimonials.length);
  const pairedTestimonials = Array.from({ length: pairedItemsCount }).map((_, i) => ({
    video: videoTestimonials[i], // Will be undefined if not enough video testimonials
    text: textTestimonials[i],   // Will be undefined if not enough text testimonials
  }));


  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
      opts={{
        loop: pairedTestimonials.length > 1, // Loop only if there's more than one effective slide
      }}
    >
      <CarouselContent>
        {pairedTestimonials.map((pair, index) => (
          <CarouselItem key={index} className="min-h-[420px] md:min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 h-full">
              {/* Video Testimonial Column (Left) */}
              {pair.video ? (
                <div className={cn("w-full h-full", !pair.text && "md:col-span-2 flex justify-center")}>
                  <TestimonialCardDisplay testimonial={pair.video} type="video" />
                </div>
              ) : (
                 !pair.text && <div className="hidden md:block"></div> // Placeholder for grid structure if no video and no text (empty slide)
              )}

              {/* Text Testimonial Column (Right) */}
              {pair.text ? (
                <div className={cn("w-full h-full", !pair.video && "md:col-span-2 md:col-start-1 flex justify-center")}>
                  <TestimonialCardDisplay testimonial={pair.text} type="text" />
                </div>
              ) : (
                !pair.video && <div className="hidden md:block"></div> // Placeholder if no text and no video
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {pairedTestimonials.length > 1 && (
        <>
            <CarouselPrevious className="hidden sm:flex left-[-15px] md:left-[-30px] xl:left-[-50px]" />
            <CarouselNext className="hidden sm:flex right-[-15px] md:right-[-30px] xl:right-[-50px]" />
        </>
      )}
    </Carousel>
  )
}
