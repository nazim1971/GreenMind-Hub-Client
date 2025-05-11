'use client';

import { useUser } from '@/context/UserContext';
import { Sparkles, Leaf, Heart, Lightbulb, Users, BarChart2 } from 'lucide-react';

const CommonDashboard = () => {
  const { user } = useUser();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, <span className="text-emerald-600 dark:text-emerald-400">{user?.name || 'Sustainability Champion'}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Your contributions are shaping a greener tomorrow. Keep inspiring others!
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
          <Sparkles className="w-10 h-10 text-amber-400" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Community Card */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">GreenMind Community</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Join <span className="font-medium text-emerald-600 dark:text-emerald-400">1,240+</span> environmental innovators collaborating on sustainable solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Your Ideas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your eco-innovations and get community feedback
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Green Projects
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Collaborate on sustainability initiatives
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Impact</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">CO₂ Reduced</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">12,450 kg</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">This month</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg">
                <p className="text-xs text-emerald-700 dark:text-emerald-400">Ideas Shared</p>
                <p className="font-semibold text-gray-800 dark:text-white">24</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg">
                <p className="text-xs text-amber-700 dark:text-amber-400">Projects Joined</p>
                <p className="font-semibold text-gray-800 dark:text-white">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-teal-100 dark:bg-teal-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Share Ideas</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Contribute your sustainable solutions and get feedback from the community.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Join Discussions</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Participate in forums about environmental challenges and solutions.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="bg-amber-100 dark:bg-amber-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Leaf className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Take Challenges</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Engage in sustainability challenges and track your environmental impact.
          </p>
        </div>
      </div>

      {/* Inspiration Footer */}
      <div className="text-center py-6 border-t border-gray-100 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" />
          Together we are planting the seeds of change
          <Leaf className="w-5 h-5 text-emerald-500" />
        </p>
      </div>
    </div>
  );
};

export default CommonDashboard;