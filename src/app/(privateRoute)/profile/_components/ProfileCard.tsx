/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import UpdateProfileModal from './UpdateProfileModal';
import UpdatePasswordModal from './UpdatePasswordModal';

interface UserForProfile {
  name: string;
  image?: string;
  [key: string]: any;
}

const ProfileCard = () => {
  const { user, setIsLoading } = useUser();
  
  const userForProfile: UserForProfile | null = user ? {
    ...user,
    name: user.name || 'User Name',
    image: user.image || undefined
  } : null;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border-0 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-400" />
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-teal-100/50 dark:bg-teal-900/20 blur-xl" />
        
        <div className="flex flex-col items-center px-8 py-10 relative z-10">
          {/* Profile image with decorative ring */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 p-1 animate-spin-slow [animation-duration:8s] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-36 h-36 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
              <Image
                src={user?.image || '/avatar.png'}
                alt="Profile"
                width={480}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
            <Sparkles className="absolute -bottom-2 -right-2 text-amber-400 w-8 h-8 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md" />
          </div>

          {/* Profile info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {user?.name || 'User Name'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
          </div>

          {/* Action buttons in one row */}
          <div className="flex flex-row gap-4 w-full max-w-xs justify-center">
            <UpdateProfileModal user={userForProfile} setIsLoading={setIsLoading} />
            <UpdatePasswordModal />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;