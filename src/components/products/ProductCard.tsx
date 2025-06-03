"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/Card";
import { Product } from "@/models/product.interface";
import Link from "next/link";
import { useContext } from "react";
import { ProductContext } from "@/providers/ProductContextProvider";

const ProductCard = ({ product }: { product: Product }) => {
  const productStore = useContext(ProductContext);

  const loadProductData = () => {
    productStore.dispatch({ type: "setProduct", product: product });
  };

  return (
    <>
      <Card className="w-full max-w-xs hover:shadow-2xl transition-all group">
        <Link href={`/product/${product.id}`} onClick={loadProductData}>
          <CardContent className="w-full">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-2 w-full">
              <span>Starting price from</span>
              <b className="text-lg">{product.price}$</b>
            </div>
            {product.images[0] ? (
              <div className="w-full overflow-hidden">
                <Image
                  className="relative! w-full h-auto! group-hover:scale-125"
                  src={product.images[0].imageUrl}
                  alt={product.name}
                  fill
                  style={{ transitionDuration: "2s" }}
                />
              </div>
            ) : (
              <span className="w-full h-52 bg-gray-500/50"></span>
            )}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;
