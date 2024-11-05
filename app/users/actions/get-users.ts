"use server";

import { get } from "@/app/common/util/fetch";
import { manyDocsResponse } from "@/app/common/interfaces/doc-response.interface";

export default async function getUsers(limit: number = 10, offset: number = 0) {
  const data = get<manyDocsResponse>(
    "users",
    ["users"],
    new URLSearchParams({ limit: limit.toString(), offset: offset.toString() })
  );
  return data;
}
