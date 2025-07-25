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
