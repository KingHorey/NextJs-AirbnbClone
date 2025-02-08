"use server";

import { myAxios } from "@/middleware";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const handleTokenRefresh = async (refreshToken: string) => {
  try {
    const response = await myAxios.post("/auth/token/refresh/", {
      refresh: refreshToken,
    });

    const { access } = response.data;
    return access;
  } catch (error) {
    console.error(error);
  }
};
