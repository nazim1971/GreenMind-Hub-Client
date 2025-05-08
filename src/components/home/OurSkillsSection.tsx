'use client';

import Image from 'next/image';
import skill from '../../assets/skill-thumb.png';
import { Leaf } from 'lucide-react';
import { Progress } from '../ui/progress';

const OurSkillsSection = () => {
  return (
    <div className="bg-[#F6F6EE] rounded-2xl dark:bg-black flex flex-col md:flex-row-reverse justify-around items-center my-26 px-8 lg:px-0 gap-5">
      <div className="mt-20 space-y-4">
        <p className="dark:text-green-300 font-bold text-black flex gap-2">
          Our SKills <Leaf />
        </p>
        <div className="text-5xl dark:text-green-600 text-black font-bold">
          Getting A Greener Future <br />
          Safe Environment
        </div>
        <div className="dark:text-gray-400 font-bold text-black">
          Competently cultivate worldwide e-tailers through principle-centered
          value <br /> professionally engineer high-payoff deliverables without
          exceptional <br />
          processes. Rapidiously network cost effective vortals
        </div>
        <div>
          <p className="text-xl dark:text-gray-200 my-2">Recycling</p>
          <Progress value={77} />
          <p className="text-xl dark:text-gray-200 mt-4  mb-2">
            Ocean Cleaning{' '}
          </p>
          <Progress value={88} />
        </div>
      </div>
      <div>
        <Image src={skill} height={500} width={500} alt="skill" />
      </div>
    </div>
  );
};

export default OurSkillsSection;