"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../../common/util/fetch";

export default async function createUser(formData: FormData) {
  const response = await post(`users`, formData);
  revalidateTag("users");
  return response;
}

async function uploadUserImage(userId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`users/${userId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
