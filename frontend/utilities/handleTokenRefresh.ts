"use server";

import axiosInstance from "../lib/axiosApi";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const handleTokenRefresh = async (refreshToken: string) => {
  const myAxios = await axiosInstance();
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
