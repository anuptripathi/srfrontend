"use server";

import { get } from "@/app/common/utils/fetch";
import { manyDocsResponse } from "@/app/common/interfaces/doc-response.interface";

export default async function getUsers(
  limit: number = 10,
  offset: number = 0,
  name?: string,
  email?: string,
  uType?: string
) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  // Add search query parameters if they exist
  if (name) params.append("name", name);
  if (email) params.append("email", email);
  if (uType) params.append("uType", uType);

  //console.log(params);

  const data = await get<manyDocsResponse>("users", ["users"], params);
  return data;
}
