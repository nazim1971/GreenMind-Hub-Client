'use client';

import { ArrowLeft, Compass, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HelperFooter = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
      <div className="flex flex-col w-full mt-8 gap-4 sm:flex-row sm:w-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5 text-green-500" />
          <span>Go Back</span>
        </button>

        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-sm hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
        >
          <Home className="w-5 h-5" />
          <span>Take Me Home</span>
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push('/ideas')}
          className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Sustainability Ideas</span>
        </button>
      </div>
    </div>
  );
};

export default HelperFooter;