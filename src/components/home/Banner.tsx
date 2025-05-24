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

const bannerData = [
  {
    image: banner1,
    text: 'Discover the Latest Trends',
  },
  {
    image: banner2,
    text: 'Style Meets Simplicity',
  },
  {
    image: banner3,
    text: 'Upgrade Your Wardrobe Today',
  },
];

export function Banner() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full my-12">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {bannerData.map((item, idx) => (
            <CarouselItem key={idx}>
              <div className="relative w-full h-[500px]">
                <Image
                  src={item.image}
                  alt={`Banner ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
                    {item.text}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
