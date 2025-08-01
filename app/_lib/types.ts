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

export interface OrderItem {
  id: number;
  order_id: number;
  quantity: number;
  products: {
    id: number;
    name: string;
    price: number;
  };
}

export interface Order {
  id: number;
  created_at: string;
  customer_id: number;
  status: string;
  total: number;
  name: string;
  shipping_address: string;
  order_items: OrderItem[];
  users: {
    id: number;
    email: string;
    name: string;
  };
}

export interface UsersType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}
