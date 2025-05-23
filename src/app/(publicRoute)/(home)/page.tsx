import { Banner } from '@/components/home/Banner';
import IdeaHome from '@/components/home/IdeaHome';
import OurSkillsSection from '@/components/home/OurSkillsSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import WorkingSolutins from '@/components/home/WorkingSolution';
import React from 'react';




const HomePage = () => {

  
  return (
    <div>
      <Banner />

      <IdeaHome />

      <OurSkillsSection />

      <WorkingSolutins />

      <TestimonialSection />
    </div>
  );
};

export default HomePage;