"use server";

import { cookies } from "next/headers";

export const handleLoginToken = async (x) => {
  const cookieStore = await cookies();
  const { access, refresh } = x;

  const accessToken = process.env.NEXT_ACCESS_TOKEN || "access_token";
  const refreshToken = process.env.NEXT_REFRESH_TOKEN || "refresh_token";
  cookieStore.set(accessToken, access);
  cookieStore.set(refreshToken, refresh);
};
