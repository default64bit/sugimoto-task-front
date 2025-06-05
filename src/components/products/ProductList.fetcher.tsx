import { getProductsList } from "@/requests/products.fetch";
import ProductCard from "./ProductCard";

const ProductListFetcher = async () => {
  const { records } = await getProductsList("server").catch(() => ({ page: 1, pageTotal: 1, records: [], total: 0 }));

  return (
    <>
      <div className="flex flex-wrap gap-16 p-4">
        {records.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
        {!records.length && <span className="text-rose-500/75">No products found!</span>}
      </div>
    </>
  );
};

export default ProductListFetcher;
