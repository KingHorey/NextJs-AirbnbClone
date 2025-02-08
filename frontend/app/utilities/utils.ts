"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { JWTPayload } from "@/lib/definitions";

export const handleLoginToken = async (x) => {
  const cookieStore = await cookies();
  const { access, refresh } = x;

  const accessToken = process.env.NEXT_ACCESS_TOKEN || "access_token";
  const refreshToken = process.env.NEXT_REFRESH_TOKEN || "refresh_token";
  cookieStore.set(accessToken, access);
  cookieStore.set(refreshToken, refresh);

  const decodedToken: JWTPayload = jwtDecode(access);
  const { full_name, email, user_id, language, currency, timezone } =
    decodedToken;

  const user = {
    full_name,
    email,
    user_id,
  };

  cookieStore.set("_user_attributes", JSON.stringify(user), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("language", language, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("_user_attributes", currency, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};
