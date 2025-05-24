'use client';

import Image from 'next/image';
import skill from '../../assets/skill.jpg';
import { Progress } from '../ui/progress';

const OurSkillsSection = () => {
  return (
    <div className="bg-[#F6F6EE] dark:bg-black rounded-2xl flex flex-col md:flex-row-reverse justify-around items-center px-6 md:px-12 py-16 gap-10 my-20">
      {/* Right Image */}
      <div>
        <Image src={skill} height={500} width={500} alt="Team Working on Environment" />
      </div>

      {/* Left Content */}
      <div className="space-y-6 max-w-xl">
        
        <h2 className="text-2xl md:text-5xl font-bold text-black dark:text-[#14B8A6] leading-tight">
          Building a Sustainable <br /> Tomorrow With Innovation
        </h2>

        <p className="text-gray-700 dark:text-gray-400 font-medium">
          We combine technology and environmental awareness to tackle global challenges. 
          Our focus lies in creating scalable solutions that restore ecosystems, reduce waste, 
          and promote clean practices for a healthier planet.
        </p>

        {/* Progress Bars */}
        <div className="space-y-6">
          <div>
            <p className="text-lg font-semibold text-[#0f766e] dark:text-[#5eead4] mb-2">
              Renewable Energy Solutions
            </p>
            <Progress value={85} />
          </div>

          <div>
            <p className="text-lg font-semibold text-[#0f766e] dark:text-[#5eead4] mb-2">
              Waste Management Programs
            </p>
            <Progress value={70} />
          </div>

          <div>
            <p className="text-lg font-semibold text-[#0f766e] dark:text-[#5eead4] mb-2">
              Smart Agriculture Systems
            </p>
            <Progress value={92} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSkillsSection;
