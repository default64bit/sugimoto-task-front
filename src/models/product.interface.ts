export interface Product {
  id: string;
  images: {
    id: string;
    imageUrl: string;
  }[];
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
}
