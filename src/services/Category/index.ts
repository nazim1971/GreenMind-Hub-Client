/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export const getAllCategories = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      next: {
        tags: ['CATEGORIES'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};