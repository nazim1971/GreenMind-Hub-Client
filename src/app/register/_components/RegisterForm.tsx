/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast, Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '@/services/AuthService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';
import { registrationValidationSchema } from './RegisterValidation';
import { ArrowLeft, Home } from 'lucide-react';

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationValidationSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res?.message);
        router.push('/login');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="dark:text-white text-black bg-transparent min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full relative border border-[#5eead4]/30 bg-white/80 dark:bg-gray-900/80">
        <Link
          href="/"
          className="absolute top-2 sm:top-3 right-4 p-2 rounded-full hover:bg-[#5eead4]/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#5eead4]"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#5eead4]">
          Create Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-lg focus:ring-2 focus:ring-[#5eead4] border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your full name"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-lg focus:ring-2 focus:ring-[#5eead4] border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your email"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="py-6 px-4 rounded-lg focus:ring-2 focus:ring-[#5eead4] border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#5eead4] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#5eead4] transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </div>

            <div className="text-center pt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-[#5eead4] hover:underline"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </Form>

        {/* Navigation Buttons */}
        <div className="flex  gap-3 flex-row justify-center items-center mt-4 pt-4 border-t border-[#5eead4]/20">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={18} className="text-[#5eead4]" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#5eead4] rounded-lg shadow-sm hover:bg-[#14b8a6] transition-colors"
          >
            <Home size={18} />
            Take Me Home
          </button>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default RegisterForm;