import { cookies } from "next/headers";
import { API_URL_AUTH, API_URL_BACKEND, AUTH_URLS } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (
  path: string,
  data: FormData | object,
  isPatch: boolean = false
) => {
  try {
    const body = data instanceof FormData ? Object.fromEntries(data) : data;
    const url = parseUrl(path);
    const method = isPatch ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...getHeaders() },
      body: JSON.stringify(body),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
      console.error(
        "Failed to post url (" + method + "):",
        url,
        res.status,
        res.statusText,
        body
      );
      const text = await res.text();
      console.log("Response text:", text);
      const errMessage = getErrorMessage(parsedRes);
      return { error: errMessage };
    }
    return { error: "", data: parsedRes };
  } catch (err) {
    return { error: "Unable to proces. try again later." };
  }
};

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
) => {
  const pUrl = parseUrl(path);
  const url = params ? `${pUrl}?` + params : `${pUrl}`;
  const res = await fetch(url, {
    headers: { ...getHeaders() },
    next: { tags },
  });

  try {
    if (!res.ok) {
      console.error(
        "Failed to get url (GET):",
        url,
        res.status,
        res.statusText
      );
      //const text = await res.text();
      // console.log("Response text:", text);
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Invalid JSON response");
  }
};

export const parseUrl = (uri: string) => {
  let url = `${API_URL_BACKEND}/${uri}`;

  // Check if `uri` contains any of the keywords
  if (AUTH_URLS.some((keyword) => uri.includes(keyword))) {
    url = `${API_URL_AUTH}/${uri}`;
  }

  return url;
};
