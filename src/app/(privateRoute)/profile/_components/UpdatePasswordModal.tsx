'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Lock } from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logOut } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { updatePassword } from '@/services/Profile';

// Schema
const formSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export default function UpdatePasswordModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsLoading } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await updatePassword(values);

      if (res?.success) {
        await logOut();
        toast.success(res?.message);
        setOpen(false);
        form.reset();
        setIsLoading(true);
        router.push('/login');
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating your password');
    } finally {
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
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md"
          >
            <Lock className="w-4 h-4 mr-2" />
            Update Password
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
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Lock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center text-gray-800 dark:text-white">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your current and new password
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter current password"
                        className="py-2 px-4 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter new password"
                        className="py-2 px-4 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <DialogFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                  disabled={loading}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}