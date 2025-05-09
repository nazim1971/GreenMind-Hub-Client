'use client';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel';

import Image from 'next/image';
import { useRef } from 'react';
import banner1 from '../../assets/banner1.avif'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'

export function Banner() {
  const images = [banner1,banner2,banner3];
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="max-w-[1250px] mx-auto my-12 flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-7xl"
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className='w-full'>
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              width={2400}
              height={1000}
              content=''
              alt="images"
            />
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}