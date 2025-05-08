/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/getValidToken';

export const getAllCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category`
     
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getIdea = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

// createAnIdea
export const createAnIdea = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

export const draftAnIdea = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea/draft`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};