'use client';

import Image from 'next/image';
import { Card } from '../ui/card';
import { useUser } from '@/context/UserContext';
import UpdateProfileModal from '../Profile/UpdateProfileModal';
import UpdatePasswordModal from '../Profile/UpdatePasswordModal';

const ProfileCard = () => {
  const { user, setIsLoading } = useUser();
  
  return (
    <div className="flex justify-center items-center min-h-screen  p-4 mt-24">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl p-6 text-center bg-white border border-[#14B8A6]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 mb-6">
            <Image
              src={user?.image || '/avatar.png'}
              alt="Profile"
              width={1200}
              height={1200}
              className="w-32 h-32 rounded-full border-4 border-[#14B8A6] object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
          <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>

          <div className="flex flex-col gap-4 w-[85%]">
            <UpdateProfileModal user={user} setIsLoading={setIsLoading} />
            <UpdatePasswordModal />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
