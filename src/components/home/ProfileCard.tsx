'use client';

import Image from 'next/image';
import { Card } from '../ui/card';

import { useUser } from '@/context/UserContext';
import UpdateProfileModal from '../Profile/UpdateProfileModal';
import UpdatePasswordModal from '../Profile/UpdatePasswordModal';


const ProfileCard = () => {
  const { user, setIsLoading } = useUser();

  //   const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center items-center min-h-screenp-4 mt-24">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl p-6text-center border-2 border-green-500">
        <div className="flex flex-col items-center">
          <Image
            src={user?.image || '/avatar.png'}
            alt="Profile"
            width={1200}
            height={1200}
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600 mb-4 ">{user?.email}</p>

          <div className="flex flex-col gap-2 w-[85%] gap-y-4">
           
            <UpdateProfileModal user={user} setIsLoading={setIsLoading} />
            <UpdatePasswordModal />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;