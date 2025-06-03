import { TbPencilPlus, TbSparkles, TbStar, TbStarFilled } from "react-icons/tb";
import { Button } from "../ui/Button";
import { Product } from "@/models/product.interface";
import NewReviewDialog from "./NewReviewDialog";

const ProductReviews = ({ reviews, productId }: { reviews: Product["reviews"]; productId: string }) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <h3 className="font-bold text-3xl">Reviews</h3>
          <div className="flex flex-wrap gap-2">
            <Button className="flex gap-2" size="sm" variant="outline">
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
              <small className="w-fit bg-neutral-200/30 p-1 px-4 rounded-full">{Intl.DateTimeFormat("en", { dateStyle: "long", timeStyle: "short" }).format(new Date(review.createdAt))}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductReviews;
