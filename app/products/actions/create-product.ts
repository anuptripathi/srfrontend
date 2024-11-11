"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../../common/utils/fetch";

export default async function createProduct(formData: FormData) {
  const response = await post(`products`, formData);
  revalidateTag("products");
  return response;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`products/${productId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
