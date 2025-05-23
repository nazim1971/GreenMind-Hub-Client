/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
