/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/services/Profile';
import { ImagePlus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UpdateProfileModalProps {
  user: { name: string; image?: string } | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfileModal({
  user,
  setIsLoading,
}: UpdateProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(picture);
    } else {
      setPreview(null);
    }
  }, [picture]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Name is required.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ name }));

      if (picture) {
        formData.append('image', picture);
      }

      const res = await updateProfile(formData);

      if (res?.success) {
        setIsLoading(true);
        toast.success(res.message);
        setOpen(false);
        setLoading(false);
        router.refresh?.();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('An error occurred while updating your profile');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md"
          >
            Edit Profile
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-lg bg-white dark:bg-gray-800 border-0 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
              Update Your Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Make changes to your profile information
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {/* Profile Picture Upload with Next.js Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Profile preview"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized // For local previews
                    />
                  ) : user?.image ? (
                    <Image
                      src={user.image}
                      alt="Current profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="picture-upload"
                  className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-emerald-600 transition-colors"
                >
                  <ImagePlus className="w-4 h-4" />
                  <input
                    id="picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={e => setPicture(e.target.files?.[0] || null)}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Display Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="py-2 px-4 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}