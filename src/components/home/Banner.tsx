'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import Image from 'next/image';
import { useRef } from 'react';
import banner1 from '../../assets/banner1.avif';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

export function Banner() {
  const images = [banner1, banner2, banner3];
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full my-12">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
