export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  skin_type: string[];
}

export interface Order {
  id: number;
  created_at: string;
  customer_id: number;
  status: string;
  total: number;
  name: string;
  shipping_address: string;
}
