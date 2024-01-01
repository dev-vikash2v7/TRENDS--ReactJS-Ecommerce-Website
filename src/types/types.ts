export interface IProduct {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  stock: number;
  delivery: string;
  images: string[];
  colors: string[];
  sizes: string[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}
