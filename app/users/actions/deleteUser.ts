"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/utils/fetch";
import { revalidateTag } from "next/cache";

export default async function deleteUser(_id: string): Promise<FormResponse> {
  try {
    const response = await post(`users/${_id}`, {}, "DELETE");
    if (response?.error) {
      return { error: response?.error };
    } else {
      revalidateTag("users");
      return response;
    }
  } catch (err) {
    return { error: "Unable to create user, please try again later." };
  }
}
