/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';

export const getAllUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}user?limit=100`,
      {
        method: 'GET',
        // headers: {
        //   Authorization: token,
        // },
        next: {
          tags: ['USERS'],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (id: string, isActive: boolean) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/user/${id}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      }
    );

    revalidateTag('USERS');
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};