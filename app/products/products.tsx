import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

export default async function Products() {
  try {
    const products = await getProducts();

    return <ProductsGrid products={products.data} />;
  } catch (err) {
    console.log("error in fetching products", err);
    return [];
  }
}
