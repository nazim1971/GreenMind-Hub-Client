/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { getCurrentUser, loginUser } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '../ui/password-input';
import { loginValidationSchema } from './LoginValidation';
import { ShinyButton } from '../magicui/shiny-button';

const LoginForm = ({ redirectPath }: { redirectPath: string | undefined }) => {
  const router = useRouter();
  const { setUser } = useUser();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        setUser(await getCurrentUser());
        toast.success(res?.message);
        router.push(redirectPath || '/');
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div suppressHydrationWarning className="dark:text-white text-black bg-transparent relative">
      <div
        className="backdrop-blur-2xl p-10 rounded-lg shadow-xl max-w-md w-full relative"
        style={{ border: '2px solid #1E90FF' }}
      >
        <Link
          href={'/'}
          className="border inline font-bold shadow-md hover:shadow-sm hover:cursor-pointer px-3 py-1 rounded-full absolute top-0 right-0 m-2"
        >
          X
        </Link>
        <h2
          className="text-3xl font-bold text-center mb-6 tracking-wide"
          style={{ color: '#1E90FF' }}
        >
          Log In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="my-4 py-6 px-4 rounded-lg shadow-md focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      style={{
                        border: '1px solid #1E90FF',
                        outline: 'none',
                      }}
                      placeholder="Enter Email"
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
                  <FormLabel />
                  <FormControl>
                    <PasswordInput
                      className="my-4 py-6 px-4 rounded-lg shadow-md focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      style={{
                        border: '1px solid #1E90FF',
                        outline: 'none',
                      }}
                      placeholder="Enter Password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button
              type="submit"
              className="shiny-button text-white rounded-lg px-6 py-3 mt-6 transition duration-300 ease-in-out"
              style={{
                backgroundColor: '#1E90FF',
                border: 'none',
              }}
            >
              {isSubmitting ? 'Logging in..' : 'Log in'}
            </Button > */}
              <ShinyButton color='white'  
              className="shiny-button text-white rounded-lg px-6 py-3 mt-6 transition duration-300 ease-in-out"
              style={{
                backgroundColor: '#1E90FF',
                border: 'none',
              }}>
                 {isSubmitting ? 'Logging in..' : 'Log in'}
              </ShinyButton>
            <h1 className="flex mt-8 text-sm text-gray-700 dark:text-gray-300">
              Don&apos;t Have an Account?{' '}
              <Link href="/register">
                <span className="ml-2 font-bold" style={{ color: '#1E90FF' }}>
                  Register
                </span>
              </Link>
            </h1>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;
