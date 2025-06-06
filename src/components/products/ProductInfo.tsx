"use client";
import { Product } from "@/models/product.interface";
// import { ProductContext } from "@/providers/ProductContextProvider";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/Button";
import { TbSparkles } from "react-icons/tb";
import ProductReviews from "./ProductReviews";
import { streamingFetch } from "@/lib/utils";
import { Skeleton } from "../ui/Skeleton";

const ProductInfo = ({ product }: { product: Product }) => {
  // const productStore = useContext(ProductContext);

  const [gettingAiInfo, setGettingAiInfo] = useState<boolean>(false);
  const [summarized, setSummarized] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");

  const summorizeDescription = async () => {
    if (gettingAiInfo || summarized) return;
    setGettingAiInfo(true);

    const response = await fetch(`http://localhost:3001/products/${product.id}/summarize`, {
      method: "POST",
      body: JSON.stringify({ type: "description" }),
      headers: { "content-type": "application/json" },
    });

    setGettingAiInfo(false);
    setSummarized(true);

    let content = "";
    const reader = response.body?.getReader();
    for await (const chunk of streamingFetch(reader)) {
      content += chunk;
      setSummary(content);
    }
  };

  return (
    <>
      <header className="flex flex-col gap-4 w-full mt-6">
        <h1 className="text-3xl md:text-5xl font-semibold">Buy {product.name}</h1>
        <span className="text-2xl">
          From <b className="text-blue-500/90 dark:text-blue-300/90">${product.price}</b>
        </span>
      </header>
      <div className="flex flex-col lg:flex-row items-start gap-10 w-full h-auto">
        <div className="lg:sticky top-8 flex items-start w-full lg:max-w-xl aspect-[1/1.25] border bg-neutral-200/20 p-4 rounded-xl hover:shadow-2xl/10 transition-all">
          <Image className="relative! w-full h-auto rounded-lg object-cover" src={product.images[0]?.imageUrl} alt={product.name} fill />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border bg-neutral-200/20 p-4 rounded-xl">
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="font-bold text-2xl">Description</h3>
              <Button className="flex gap-2" size="sm" variant="outline" onClick={summorizeDescription}>
                <TbSparkles className="text-violet-500/90" size="1.2rem" /> Summorize
              </Button>
            </div>
            {gettingAiInfo && (
              <div className="flex flex-col gap-2 w-full border p-4 rounded-xl bg-neutral-500/15">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-7/12 h-3" />
              </div>
            )}
            {summary && <div className="flex flex-col gap-2 w-full border p-4 rounded-xl bg-neutral-500/15">{summary}</div>}
            <p className="text-lg whitespace-pre-line rounded-lg">{product.desc}</p>
          </div>
          {product.options.map((option, i) => (
            <div className="flex flex-col gap-4 border bg-neutral-200/20 p-4 rounded-xl" key={i}>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-bold text-2xl">{option.name}</h3>
                {option.desc && <small>{option.desc}</small>}
              </div>

              <ul className="flex flex-wrap gap-2 w-full">
                {option.optionValues.map((v, i) => (
                  <li className="" key={i}>
                    <Button size="sm">{v.value}</Button>{" "}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button className="text-lg py-6 border-blue-500/50" variant="outline" size="lg">
            Buy
          </Button>
        </div>
      </div>

      <span className="mt-5"></span>
      <ProductReviews reviews={product.reviews} productId={product.id} />
    </>
  );
};

export default ProductInfo;
