'use client';

import { useUser } from '@/context/UserContext';
import { Sparkles, Leaf, Heart } from 'lucide-react';

const CommonDashboard = () => {
  const { user } = useUser();

  return (
    <div className="my-12 mx-4 md:mx-10">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold mb-3 flex items-center justify-center gap-2 text-gray-800 dark:text-green-400">
          <span>Welcome back, {user?.name ? user.name : 'Eco-Explorer'}!</span>
          <Sparkles className="text-yellow-500" size={32} />
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You’re making a real difference, one green step at a time!
        </p>
      </div>

      {/* GreenMind-Hub Intro */}
      <div className="bg-gradient-to-r from-[#14B8A6] to-[#80E4D5] rounded-xl p-8 mb-8 shadow-xl">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Welcome to GreenMind-Hub 🌱
        </h3>
        <p className="text-lg text-white mb-4">
          Join our community of passionate changemakers committed to creating a
          sustainable future. Whether you re starting small or leading major
          environmental initiatives, we’re here to support you every step of the way.
        </p>
        <p className="text-white">
          Share your green ideas, collaborate with like-minded individuals, and
          be part of a movement for a cleaner, greener world.
        </p>
      </div>

      {/* How You Can Get Involved Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Leaf className="text-green-600 dark:text-green-300" size={24} />
            How You Can Get Involved
          </h4>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <Heart className="text-red-500" size={20} />
              <span>Share your eco-friendly projects and ideas</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart className="text-red-500" size={20} />
              <span>Join green discussions in our community forums</span>
            </li>
            <li className="flex items-start gap-2">
              <Heart className="text-red-500" size={20} />
              <span>Collaborate on sustainability challenges</span>
            </li>
          </ul>
        </div>

        {/* Your Green Impact Section */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-600 dark:text-purple-300" size={24} />
            Your Green Impact
          </h4>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thanks to your amazing efforts, the Eco-Community has collectively
            reduced{" "}
            <span className="font-bold text-purple-600 dark:text-purple-300">
              12,450 kg{" "}
            </span>
            of CO₂ emissions this month. Every small action counts in the fight
            for a sustainable future!
          </p>
        </div>
      </div>

      {/* Closing Motivation */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          <Leaf size={16} className="text-green-500" />
          Let’s continue growing our impact, one green idea at a time
          <Leaf size={16} className="text-green-500" />
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;
