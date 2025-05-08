/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/getValidToken';

export const getMemberOwnIdeas = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/idea/me?limit=100`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteIdea = async (id: string) => {
  try {
    const token = await getValidToken();

    if (!token)
      return { success: false, message: 'Authentication token not found' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error);
  }
};