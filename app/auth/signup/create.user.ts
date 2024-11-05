"use server";

import { getErrorMessage } from "@/app/util/errors";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: any, formData: FormData) {
  try {
    const res = await fetch(`users`, {
      method: "POST",
      body: formData,
    });
    const parsedRes = await res.json();
    if (!res.ok) {
      return { error: getErrorMessage(parsedRes) };
    }
  } catch (err) {
    return { error: "Please try again later." };
  }
  redirect("/");
}
