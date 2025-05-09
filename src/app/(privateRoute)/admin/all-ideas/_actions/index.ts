/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

import { getValidToken } from "@/lib/getValidToken";

export const getAllIdeasByAdmin = async () => {
  try {
    const token = await getValidToken();
    if (!token)
      return { success: false, message: "Authentication token not found" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/idea/admin/all-ideas?limit=100`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: {
          tags: ["IDEAS"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateIdeaStatus = async (
  id: string,
  payload: { status: string; feedback?: string }
) => {
  
  try {
    const token = await getValidToken();
    if (!token)
      return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",Authorization: token,},
      body: JSON.stringify(payload),
    });

    revalidateTag("IDEAS");
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
      return { success: false, message: "Authentication token not found" };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/idea/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error);
  }
};
