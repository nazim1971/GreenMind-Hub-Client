
import HeroSection from '@/components/home/HeroSection';
import IdeaHome from '@/components/home/IdeaHome';
import { Newsletter } from '@/components/home/Newsletter';
import OurSkillsSection from '@/components/home/OurSkillsSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import WorkingSolutins from '@/components/home/WorkingSolution';
import React from 'react';




const HomePage = () => {

  
  return (
    <div className='w-full'>
      <HeroSection/>

      <IdeaHome />

      <OurSkillsSection />

      <WorkingSolutins />

      <TestimonialSection />

      <Newsletter/>
    </div>
  );
};

export default HomePage;