import { TbPencilPlus, TbSparkles } from "react-icons/tb";
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
        <ul>
          {reviews.map((review, i) => (
            <li className="" key={i}>
              <div className="flex gap-4 w-full">
                <span>{review.user}</span>
                <span>{review.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductReviews;
