
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
              <Card className="shadow-lg overflow-hidden bg-card">
                <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] sm:min-h-[320px] text-center relative">
                  {testimonial.videoUrl && testimonial.videoPlaceholderImageUrl ? (
                    <div className="flex flex-col items-center w-full">
                      <div className="relative group w-full max-w-md aspect-video mb-4">
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
                      <p className="text-xs text-muted-foreground mt-1 mb-3">Click to watch video testimonial</p>
                    </div>
                  ) : (
                    <>
                      <Quote className="h-10 w-10 text-primary/30 mb-4" />
                      <p className="text-base md:text-lg font-medium text-foreground/90 leading-relaxed mb-6">
                        {testimonial.quote}
                      </p>
                    </>
                  )}

                  <div className="flex items-center mt-auto pt-4 border-t border-border/50 w-full justify-center">
                    {testimonial.authorImageUrl && (
                       <Avatar className="h-12 w-12 mr-3 shrink-0">
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
      <CarouselPrevious className="hidden sm:flex left-[-20px] md:left-[-40px]" />
      <CarouselNext className="hidden sm:flex right-[-20px] md:right-[-40px]" />
    </Carousel>
  )
}
