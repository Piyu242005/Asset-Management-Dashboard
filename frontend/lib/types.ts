export type User = {
  id: number;
  email: string;
  full_name?: string;
  is_admin: boolean;
  is_active: boolean;
  profile_image?: string;
};

export type Asset = {
  id: number;
  name: string;
  category: string;
  type: string;
  value: number;
  status: string;
  location_id?: number | null;
  owner_id?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type DashboardData = {
  summary: {
    total_assets_value: number;
    by_type: Record<string, number>;
    by_status: Record<string, number>;
    asset_count: number;
  };
  monthly: { month: string; financial?: number; tangible?: number; intangible?: number }[];
  locations: { location: string; count: number }[];
  recent_assets: Pick<Asset, "id" | "name" | "category" | "type" | "value" | "status">[];
};

export type Maintenance = {
  id: number;
  title: string;
  description?: string;
  cost: number;
  scheduled_date: string;
  status: string;
  asset_id?: number | null;
  created_at?: string;
};

export type Inventory = {
  id: number;
  item_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  category: string;
  low_stock_threshold: number;
  created_at?: string;
};

export type Financial = {
  id: number;
  title: string;
  amount: number;
  type: string; // income, expense
  category: string;
  date: string;
  description?: string;
  created_at?: string;
};

export type Schedule = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  location?: string;
  description?: string;
  type: string;
  created_at?: string;
};

