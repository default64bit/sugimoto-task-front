import { Card, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";

const ProductListLoader = () => {
  return (
    <>
      <div className="flex flex-wrap gap-16 p-4">
        {[0, 1, 2, 3].map((i) => (
          <Card className="w-full sm:max-w-xs hover:shadow-2xl transition-all" key={i}>
            <CardContent className="flex flex-col gap-4 w-full">
              <h2 className="text-xl font-bold">
                <Skeleton className="w-full h-6 rounded-md" />
              </h2>
              <div className="flex items-center gap-2 w-full">
                <Skeleton className="w-8/12 h-3 rounded-md" />
                <Skeleton className="w-6 h-3 rounded-md" />
              </div>
              <Skeleton className="w-full h-72 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductListLoader;
