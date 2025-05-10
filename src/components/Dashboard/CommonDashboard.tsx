'use client';

import { useUser } from '@/context/UserContext';
import { Sparkles, Globe, HeartHandshake } from 'lucide-react';

const CommonDashboard = () => {
  const { user } = useUser();

  return (
    <div className="my-12 mx-4 md:mx-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2 text-gray-800 dark:text-green-400">
          <span>Welcome back, {user?.name ? user.name : 'Eco-Explorer'}!</span>
          <Sparkles className="text-yellow-500" size={32} />
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You are the change our planet needs!
        </p>
      </div>

      <div className="bg-[#80E4D5] dark:bg-green-900/20 rounded-xl p-6 mb-8 border border-green-100 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Welcome to GreenMind-Hub, Your Eco-Adventure Starts Here
            </h3>
            <p className="text-justify text-gray-700 dark:text-gray-300">
              At GreenMind-Hub, we believe that every sustainable idea, no matter how small, makes a huge difference. Whether you’re looking to reduce your carbon footprint or lead a large-scale green initiative, we are here to support you. Share your solutions, collaborate with fellow changemakers, and inspire others to make a lasting environmental impact.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
           
            <h4 className=" text-gray-800 dark:text-gray-100 font-semibold">How You Can Get Involved</h4>
          </div>
          <ul className="space-y-2 pl-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              
              <span>Post your eco-friendly projects and ideas</span>
            </li>
            <li className="flex items-start gap-2">
              
              <span>Join green discussions in our forums</span>
            </li>
            <li className="flex items-start gap-2">
              
              <span>Collaborate on sustainability challenges</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-3">
           
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">Your Green Impact</h4>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Thanks to your contributions, the Eco-Community has collectively reduced
            <span className="font-bold text-purple-600 dark:text-purple-300">
              {' '}
              12,450 kg{' '}
            </span>
            of CO₂ emissions this month. Together, we are moving closer to a sustainable future.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          
          Let’s continue to grow our impact, one green idea at a time
          
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;
