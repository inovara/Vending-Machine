export type Product = {
  id: number;
  name: string;
  barcode: string | null;
  measure: string;
  amount: string;
  description: string;
  supply_price: string;
  markup: string;
  price: string;
  features: string[] | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  specifications: {
    dimensions?: string;
    weight?: string;
    capacity?: string;
    power?: string;
    connectivity?: string;
  } | null;
  enable_retail_sales: number;
  enable_team_member_commission: number;
  track_stock_quantity: number;
  sku_code: string;
  current_stock_quantity: string;
  low_stock_level: string;
  low_stock_level_notification: number;
  brand_id: number | null;
  category_id: number;
  created_at: string;
  updated_at: string;
  images: string[] | null;
};
