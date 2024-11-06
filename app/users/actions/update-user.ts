"use server";

import { getErrorMessage } from "@/app/common/util/errors";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/util/fetch";
import { revalidateTag } from "next/cache";

export default async function updateUser(
  _id: string,
  formData: object
): Promise<FormResponse> {
  try {
    const response = await post(`users/${_id}`, formData);
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
