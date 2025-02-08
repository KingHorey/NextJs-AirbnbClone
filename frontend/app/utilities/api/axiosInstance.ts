"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = async () => {
  const cookieStore = await cookies();
  const tokenName = process.env.NEXT_ACCESS_TOKEN || "access_token";
  const accessToken = cookieStore.get(tokenName)?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_BASE_URL || "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

export const reqFlow = async (url: string, method: string, data: any) => {
  try {
    const axiosApi = await axiosInstance();
    const response = await axiosApi({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
