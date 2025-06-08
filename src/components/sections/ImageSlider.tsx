"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageSlide {
  id: string
  imageUrl: string
  altText?: string
  caption?: string
  link?: string
}

interface ImageSliderProps {
  images: ImageSlide[]
  imagesPerSlide?: number // default 1 for single image
}

const ImageCardDisplay = ({ image }: { image: ImageSlide }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-end m-0 p-0">
    {image.link ? (
      <a
        href={image.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full"
      >
        <Image
          src={image.imageUrl}
          alt={image.altText || "Image"}
          fill
          className="object-contain rounded-lg shadow-md m-0 p-0"
          sizes="100vw"
          priority
        />
      </a>
    ) : (
      <Image
        src={image.imageUrl}
        alt={image.altText || "Image"}
        fill
        className="object-contain rounded-lg shadow-md m-0 p-0"
        sizes="100vw"
        priority
      />
    )}
    {image.caption && (
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center rounded-b-lg m-0">
        {image.caption}
      </div>
    )}
  </div>
)

export default function ImageSlider({ images, imagesPerSlide = 1 }: ImageSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  if (!images || images.length === 0) return null

  // Group images per slide
  const groupedImages: ImageSlide[][] = []
  for (let i = 0; i < images.length; i += imagesPerSlide) {
    groupedImages.push(images.slice(i, i + imagesPerSlide))
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-screen min-h-screen max-w-full mx-auto m-0 p-0"
      opts={{
        loop: groupedImages.length > 1,
      }}
    >
      <CarouselContent className="w-full h-screen min-h-screen m-0 p-0">
        {groupedImages.map((group, idx) => (
          <CarouselItem key={idx} className="w-full h-screen min-h-screen m-0 p-0">
            <div className="w-full h-full grid grid-cols-1 m-0 p-0">
              {group.map((img) => (
                <ImageCardDisplay key={img.id} image={img} />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {groupedImages.length > 1 && (
        <>
          <CarouselPrevious className="hidden sm:flex left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="hidden sm:flex right-4 top-1/2 -translate-y-1/2 z-10" />
        </>
      )}
    </Carousel>
  )
}