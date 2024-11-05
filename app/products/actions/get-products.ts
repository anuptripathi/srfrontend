"use server";

import { get } from "@/app/common/util/fetch";
import { API_URL_BACKEND } from "@/app/common/constants/api";
import { manyDocsResponse } from "@/app/common/interfaces/doc-response.interface";

export default async function getProducts(
  limit: number = 10,
  offset: number = 0
) {
  const url = API_URL_BACKEND + "/products";
  return get<manyDocsResponse>(
    url,
    ["products"],
    new URLSearchParams({ limit: limit.toString(), offset: offset.toString() })
  );
}
