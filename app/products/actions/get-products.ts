"use server";

import { get } from "@/app/common/utils/fetch";
import { manyDocsResponse } from "@/app/common/interfaces/doc-response.interface";

export default async function getProducts(
  limit: number = 10,
  offset: number = 0
) {
  const url = "products";
  return get<manyDocsResponse>(
    url,
    ["products"],
    new URLSearchParams({ limit: limit.toString(), offset: offset.toString() })
  );
}
