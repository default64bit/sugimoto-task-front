import Image from "next/image";
import { Card, CardContent } from "../ui/Card";
import { Product } from "@/models/product.interface";

const ProductCard = (product: Product) => {
  return (
    <>
      <Card className="w-full max-w-xs hover:shadow-2xl transition-all">
        <CardContent className="w-full">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-2 w-full">
            <span>Starting price from</span>
            <b className="text-lg">{product.price}$</b>
          </div>
          {product.images[0] ? (
            <Image className="relative! w-full" src={product.images[0]} alt="apple" fill />
          ) : (
            <span className="w-full h-52 bg-gray-500/50"></span>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
