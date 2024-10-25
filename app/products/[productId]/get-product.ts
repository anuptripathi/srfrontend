import { get } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";
import { API_URL_BACKEND } from "@/app/common/constants/api";

export default async function getProduct(productId: string) {
  return get<Product>(`${API_URL_BACKEND}/products/${productId}`);
}
