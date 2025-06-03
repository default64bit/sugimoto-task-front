import { getProductsList } from "@/requests/products.fetch";

const ProductListFetcher = async () => {
  let { records, total, page, pageTotal } = await getProductsList("server");

  return (
    <>
      <div></div>
    </>
  );
};

export default ProductListFetcher;
