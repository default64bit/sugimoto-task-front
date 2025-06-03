import { Card, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";

const ProductLoader = () => {
  return (
    <>
      <header className="flex flex-col gap-4 w-full mt-6">
        <h1 className="text-3xl md:text-5xl font-semibold">
          <Skeleton className="w-7/12 h-6 rounded-md" />
        </h1>
        <span className="text-xl">
          <Skeleton className="w-5/12 h-3 rounded-md" />
        </span>
      </header>
      <div className="flex items-start w-full">
        <Skeleton className="w-full max-w-lg aspect-square rounded-md" />
      </div>
    </>
  );
};

export default ProductLoader;
