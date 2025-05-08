'use client';

import { useUser } from '@/context/UserContext';
import { Leaf, Lightbulb, Sparkles, Globe, HeartHandshake } from 'lucide-react';

const CommonDashboard = () => {
  const { user } = useUser();

  return (
    <div className="my-12 mx-4 md:mx-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Leaf className="text-green-500" size={32} />
          <span>Welcome back, {user?.name ? user.name : 'Eco-Champion'}!</span>
          <Sparkles className="text-yellow-400" size={32} />
        </h2>
        <p className="text-lg text-muted-foreground">
          Your green ideas are shaping a better tomorrow
        </p>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-8 border border-green-100 dark:border-green-800">
        <div className="flex items-start gap-4">
          <Lightbulb
            className="text-green-600 dark:text-green-300 mt-1 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Welcome to ThinkGreenly! 🌱
            </h3>
            <p className="text-justify">
              We&apos;re excited to have you join our community of
              sustainability innovators. At ThinkGreenly, we believe every green
              idea counts - from small daily habits to large-scale environmental
              projects. Share your eco-friendly solutions, collaborate with
              like-minded individuals, and help accelerate the transition to a
              sustainable future.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="text-blue-600 dark:text-blue-300" size={20} />
            <h4 className="font-medium">Quick Start</h4>
          </div>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <Sparkles
                className="text-blue-400 mt-0.5 flex-shrink-0"
                size={16}
              />
              <span>Share your first sustainability idea</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles
                className="text-blue-400 mt-0.5 flex-shrink-0"
                size={16}
              />
              <span>Explore ideas in trending categories</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles
                className="text-blue-400 mt-0.5 flex-shrink-0"
                size={16}
              />
              <span>Connect with other eco-innovators</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-3">
            <HeartHandshake
              className="text-purple-600 dark:text-purple-300"
              size={20}
            />
            <h4 className="font-medium">Community Impact</h4>
          </div>
          <p className="text-sm">
            Your participation has helped the ThinkGreenly community reduce an
            estimated
            <span className="font-bold text-purple-600 dark:text-purple-300">
              {' '}
              12,450 kg{' '}
            </span>
            of CO₂ emissions this month alone. Keep up the amazing work!
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Leaf size={16} className="text-green-500" />
          Together, we&apos;re growing a greener future
          <Leaf size={16} className="text-green-500" />
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;