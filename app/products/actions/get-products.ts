"use server";

import { get } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";
import { API_URL_BACKEND } from "@/app/common/constants/api";

export default async function getProducts() {
  const url = API_URL_BACKEND + "/products";
  return get<Product[]>(
    url,
    ["products"],
    new URLSearchParams({ status: "availible" })
  );
}
