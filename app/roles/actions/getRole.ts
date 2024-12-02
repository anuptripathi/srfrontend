"use server";

import { get } from "@/app/common/utils/fetch";
import { manyDocsResponse } from "@/app/common/interfaces/doc-response.interface";

export default async function getRoles(
  limit: number = 10,
  offset: number = 0,
  title?: string,
  subject?: string
) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  // Add search query parameters if they exist
  if (title) params.append("title", title);
  if (subject) params.append("subject", subject);

  //console.log(params);

  const data = await get<manyDocsResponse>("roles", ["roles"], params);
  return data;
}
