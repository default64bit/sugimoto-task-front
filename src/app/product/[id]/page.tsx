import ProductFetcher from "@/components/products/Product.fetcher";
import ProductLoader from "@/components/products/Product.loader";
import { Suspense } from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Suspense fallback={<ProductLoader />}>
        <ProductFetcher productId={(await params).id} />
      </Suspense>
    </>
  );
};

export default ProductPage;
