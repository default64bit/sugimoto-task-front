"use client";
import { useReducer, createContext, Dispatch, useContext } from "react";

type Product = {
  id: string;
  images: string[];
  name: string;
  desc: string;
  price: number;
  options: {
    id: string;
    name: string;
    desc: string;
    optionValues: {
      id: string;
      value: string;
      desc: string;
      extraAddedPrice: number;
    }[];
  }[];
};
type actionType = { type: "setProduct"; product: Product };

const ProductInital: Product = {
  id: "",
  images: [],
  name: "",
  desc: "",
  price: 0,
  options: [],
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
