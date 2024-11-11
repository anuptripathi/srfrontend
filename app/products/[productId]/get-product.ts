import { get } from "@/app/common/utils/fetch";
import { Product } from "../interfaces/product.interface";
export default async function getProduct(productId: string) {
  return get<Product>(`products/${productId}`);
}
