import { getSingleProduct } from "@/requests/products.fetch";
import ProductInfo from "./ProductInfo";

const ProductFetcher = async ({ productId }: { productId: string }) => {
  const product = await getSingleProduct("server", productId).catch(() => undefined);

  return <>{!product ? <span className="text-rose-500/75">Product not found!</span> : <ProductInfo product={product} />}</>;
};

export default ProductFetcher;
