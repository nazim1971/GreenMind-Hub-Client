'use client';

import styles from './HeroSection.module.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BlurText from '../BlurText';

const HeroSection = () => {
  return (
    <div
      className={`${styles.banner} p-6 md:p-28 rounded-3xl flex flex-col justify-around items-center gap-5`}
    >
      <div className="flex flex-col justify-around items-center gap-5">
        <h3>
          <BlurText
            text="Greenmind"
            delay={150}
            animateBy="letters"
            direction="bottom"
            className="text-4xl md:text-6xl font-bold text-white"
          />
        </h3>

        <h3 className="text-white text-center">
          Experience the pinnacle of in peace living with GreenMind!
        </h3>
      </div>

      <Link href="/idea">
        <Button
          size="lg"
          className="text-black hover:text-white bg-white hover:bg-[#14B8A6] dark:text-white dark:hover:text-black dark:bg-[#14B8A6] dark:hover:bg-white transition duration-300 ease-in-out cursor-pointer"
        >
          Get all Ideas
        </Button>
      </Link>
    </div>
  );
};

export default HeroSection;