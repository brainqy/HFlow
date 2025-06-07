
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

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
import { Quote, PlayCircle } from "lucide-react"
import Link from "next/link"

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <div className="p-1">
              <Card className="shadow-lg overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-video sm:aspect-[16/7] md:aspect-[16/6] text-center relative bg-card">
                  <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
                  <Quote className="absolute bottom-4 right-4 h-8 w-8 text-primary/20 transform scale-x-[-1] scale-y-[-1]" />

                  {testimonial.videoUrl && testimonial.videoPlaceholderImageUrl ? (
                    <div className="mb-6 relative group">
                      <Image
                        src={testimonial.videoPlaceholderImageUrl}
                        alt={`Video testimonial from ${testimonial.authorName}`}
                        width={320}
                        height={180}
                        className="rounded-lg shadow-md"
                        data-ai-hint="video testimonial placeholder"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300 rounded-lg">
                        <Link href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch video testimonial from ${testimonial.authorName}`}>
                          <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors duration-300" />
                        </Link>
                      </div>
                       <p className="text-xs text-muted-foreground mt-2">Click to watch video testimonial</p>
                    </div>
                  ) : (
                    <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-6 italic px-4">
                      "{testimonial.quote}"
                    </p>
                  )}

                  <div className="flex items-center">
                    {testimonial.authorImageUrl && (
                       <Avatar className="h-12 w-12 mr-4">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
