"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/utils/fetch";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: FormResponse,
  formData: FormData
) {
  try {
    const { error } = await post("users", formData);
    if (error) {
      return { error };
    }
  } catch (err) {
    return { error: "Please try again later." };
  }
  redirect("/");
}
