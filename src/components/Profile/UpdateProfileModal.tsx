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

interface UpdateProfileModalProps {
  user: { name: string } | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfileModal({
  user,
  setIsLoading,
}: UpdateProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

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
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="col-span-3"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Picture
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={e => setPicture(e.target.files?.[0] || null)}
              className="col-span-3"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}