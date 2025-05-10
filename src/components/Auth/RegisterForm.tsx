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
    <div className="dark:text-white text-black bg-transparent">
      <div
        className="backdrop-blur-2xl p-8 rounded-lg shadow-lg max-w-md w-full relative"
        style={{ border: '2px solid #1E90FF' }}
      >
        <Link
          href="/"
          className="border inline font-bold shadow-md hover:shadow-sm hover:cursor-pointer px-3 py-1 rounded-full absolute top-0 right-0 m-2"
        >
          X
        </Link>
        <h2
          className="text-3xl font-bold text-center mb-6 tracking-wide"
          style={{ color: '#1E90FF' }}
        >
          Register
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="py-6"
                      style={{
                        border: '1px solid #1E90FF',
                        borderRadius: '8px',
                      }}
                      placeholder="Enter User Name"
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
                  <FormLabel />
                  <FormControl>
                    <Input
                      className="mt-4 py-6"
                      style={{
                        border: '1px solid #1E90FF',
                        borderRadius: '8px',
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
                      className="my-4 py-6"
                      style={{
                        border: '1px solid #1E90FF',
                        borderRadius: '8px',
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

            <Button
              type="submit"
              className="mt-3 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out"
              style={{ backgroundColor: '#1E90FF', border: 'none' }}
            >
              {isSubmitting ? 'Registering..' : 'Register'}
            </Button>
            <h1 className="mt-4">
              Already Have an Account? Please
              <Link href="/login">
                <span className="ml-2 font-bold" style={{ color: '#1E90FF' }}>
                  Login
                </span>
              </Link>
            </h1>
          </form>
        </Form>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default RegisterForm;
