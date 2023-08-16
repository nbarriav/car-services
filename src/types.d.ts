export interface Service {
  id: number;
  product: {
    id: number;
    name: string;
  };

  date: string;
  patent: string;
  address: string;
  value: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
