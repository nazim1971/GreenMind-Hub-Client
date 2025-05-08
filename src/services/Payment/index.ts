/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { FieldValues } from 'react-hook-form';
import { revalidateTag } from 'next/cache';
import { getValidToken } from '@/lib/getValidToken';

// create Payment
export const createPayment = async (paymentData: FieldValues): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    revalidateTag('PAYMENTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getAllPayments for Admin
export const getAllPayments = async (
  // page?: string,
  // limit?: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment?limit=100`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['PAYMENTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getMemberPayments for Member
export const getMemberPayments = async (
  // page?: string,
  // limit?: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/member?limit=100`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
        next: {
          tags: ['PAYMENTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// validate Payment
export const validatePayment = async (tran_id: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/validate?tran_id=${tran_id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag('PAYMENTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};