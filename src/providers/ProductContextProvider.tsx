"use client";
import { Product } from "@/models/product.interface";
import { useReducer, createContext, Dispatch, useContext } from "react";

type actionType = { type: "setProduct"; product: Product };

const ProductInital: Product = {
  id: "",
  images: [],
  name: "",
  desc: "",
  price: 0,
  options: [],
  reviews: [],
};
const contextInitalValue: { value: Product; dispatch: Dispatch<actionType> } = { value: ProductInital, dispatch: () => {} };
export const ProductContext = createContext(contextInitalValue);

const reducer = (state: Product, action: actionType) => {
  let newState: Product = state;
  switch (action.type) {
    case "setProduct":
      newState = action.product;
      break;
  }
  return newState;
};

const ProductContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [product, dispatch] = useReducer(reducer, ProductInital);
  return <ProductContext.Provider value={{ value: product, dispatch }}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
