export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  is_premium: boolean;
  twitter_username?: string;
  created_at: string;
}

export interface Thread {
  id: number;
  user_id: number;
  title: string;
  content: TweetContent[];
  template_id?: number;
  status: "draft" | "scheduled" | "publishing" | "published" | "failed";
  scheduled_at?: string | null;
  published_at?: string;
  twitter_thread_id?: string;
  engagement_data?: any;
  created_at: string;
  updated_at?: string;
}

export interface TweetContent {
  id: string;
  content: string;
  order: number;
  type: "text" | "quote" | "image";
  metadata?: any;
}

export interface Template {
  id: number;
  name: string;
  description?: string;
  category: string;
  structure: TemplateStructure[];
  compliance_disclaimers?: string[];
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
}

export interface TemplateStructure {
  type: string;
  content: string;
  placeholders: string[];
}

export interface CustomTemplate {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  structure: TemplateStructure[];
  compliance_disclaimers?: string[];
  created_at: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume?: number;
  market_cap?: number;
  pe_ratio?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface TwitterStatus {
  is_connected: boolean;
  twitter_username?: string;
}
