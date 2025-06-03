import ProductListFetcher from "@/components/products/ProductList.fetcher";
import ProductListLoader from "@/components/products/ProductList.loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="flex flex-col text-2xl font-bold m-4">
        <span className="text-3xl">Store.</span>
        <span className="opacity-50">The best way to buy the products you love.</span>
      </h1>

      <Suspense fallback={<ProductListLoader />}>
        <ProductListFetcher />
      </Suspense>
    </div>
  );
}
