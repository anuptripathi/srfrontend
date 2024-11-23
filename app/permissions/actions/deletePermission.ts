"use server";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/utils/fetch";
import { revalidateTag } from "next/cache";

export default async function deleteUser(_id: string): Promise<FormResponse> {
  try {
    const response = await post(`permissions/${_id}`, {}, "DELETE");
    if (response?.error) {
      return { error: response?.error };
    } else {
      revalidateTag("permissions");
      return response;
    }
  } catch (err) {
    return { error: "Unable to create permissions, please try again later." };
  }
}
