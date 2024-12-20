"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL_AUTH } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/utils/errors";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export default async function login(
  _prevState: FormResponse,
  formData: FormData
) {
  try {
    const res = await fetch(`${API_URL_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
      return { error: getErrorMessage(parsedRes) };
    }
    setAuthCookie(res);
  } catch (err) {
    return { error: "Unable to process, please try again later." };
  }
  redirect("/");
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
