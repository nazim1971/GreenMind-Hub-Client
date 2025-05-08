/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/getValidToken';
import { cookies } from 'next/headers';

export const updatePassword = async (payload: {
  newPassword: string;
  oldPassword: string;
}) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/profile`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    const result = await res.json();

    if (result.success) {
      (await cookies()).set('accessToken', result.data.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    console.error(error);
  }
};