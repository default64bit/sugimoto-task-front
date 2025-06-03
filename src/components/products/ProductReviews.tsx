"use client";
import { TbSparkles, TbStar, TbStarFilled } from "react-icons/tb";
import { Button } from "../ui/Button";
import { Product } from "@/models/product.interface";
import NewReviewDialog from "./NewReviewDialog";
import { useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import { streamingFetch } from "@/lib/utils";

const ProductReviews = ({ reviews, productId }: { reviews: Product["reviews"]; productId: string }) => {
  const [gettingAiInfo, setGettingAiInfo] = useState<boolean>(false);
  const [summarized, setSummarized] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");

  const summorizeReviews = async () => {
    if (gettingAiInfo || summarized) return;
    setGettingAiInfo(true);

    const response = await fetch(`http://localhost:3001/products/${productId}/summarize`, {
      method: "POST",
      body: JSON.stringify({ type: "reviews" }),
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
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <h3 className="font-bold text-3xl">Reviews</h3>
          <div className="flex flex-wrap gap-2">
            <Button className="flex gap-2" size="sm" variant="outline" onClick={summorizeReviews}>
              <TbSparkles className="text-violet-500/90" size="1.2rem" /> Summorize
            </Button>
            <NewReviewDialog productId={productId} />
          </div>
        </div>
        {!reviews.length && (
          <>
            <span className="border bg-neutral-200/20 rounded-xl p-4">No review yet! Be the first to add one 👽</span>
          </>
        )}
        <ul className="flex flex-col gap-4">
          {gettingAiInfo && (
            <li className="flex flex-col gap-2 w-full border p-4 rounded-xl">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-7/12 h-3" />
            </li>
          )}
          {summary && <li className="flex flex-col gap-2 w-full border p-4 rounded-xl">{summary}</li>}

          {reviews.map((review, i) => (
            <li className="flex flex-col gap-2 w-full border p-4 rounded-xl" key={i}>
              <div className="flex items-center justify-between gap-4 w-full">
                <span className="text-xl">{review.user}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from(Array(review.rating)).map((v, i) => (
                      <TbStarFilled size="1.25rem" key={i} />
                    ))}
                    {Array.from(Array(5 - review.rating)).map((v, i) => (
                      <TbStar size="1.25rem" key={i} />
                    ))}
                  </div>
                  <span>{review.rating} Stars</span>
                </div>
              </div>
              <p className="whitespace-pre-line">{review.reviewText}</p>
              <small className="w-fit bg-neutral-200/30 p-1 px-4 rounded-full">
                {Intl.DateTimeFormat("en", { dateStyle: "long", timeStyle: "short" }).format(new Date(review.createdAt))}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductReviews;
