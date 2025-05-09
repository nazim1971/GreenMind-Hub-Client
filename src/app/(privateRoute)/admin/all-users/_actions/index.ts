/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/getValidToken";
import { revalidateTag } from "next/cache";



export const getAllUsers = async () => {
  try {
    const token = await getValidToken();
        if (!token)
      return { success: false, message: "Authentication token not found" };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["USERS"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (id: string, isActive: boolean) => {
  try {
 
    const token = await getValidToken();
     if (!token)
      return { success: false, message: "Authentication token not found" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ isActive }),
      }
    );

    revalidateTag("USERS");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
