"use server";

import { getErrorMessage } from "@/app/common/utils/errors";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/utils/fetch";
import { revalidateTag } from "next/cache";

export default async function createUser(formData: any): Promise<FormResponse> {
  try {
    const response = await post(`roles`, formData);
    if (response?.error) {
      return { error: response?.error };
    } else {
      revalidateTag("roles");
      return response;
    }
  } catch (err) {
    return { error: "Unable to create roles, please try again later." };
  }
}
