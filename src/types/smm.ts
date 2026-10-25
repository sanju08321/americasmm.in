export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier against USD
  name: string;
}

export type PlatformCategory =
  | 'All'
  | 'Instagram'
  | 'TikTok'
  | 'YouTube'
  | 'Telegram'
  | 'Twitter'
  | 'Facebook'
  | 'Spotify'
  | 'Discord'
  | 'Website Traffic';

export interface SMMService {
  id: number;
  category: PlatformCategory;
  name: string;
  ratePer1k: number; // in USD
  min: number;
  max: number;
  avgTime: string;
  refillDays: number | 'Lifetime' | 'No Refill';
  description: string;
  speed: string;
  guarantee: string;
  startDelay: string;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Processing' | 'Completed' | 'Canceled';

export interface SMMOrder {
  orderId: string;
  serviceId: number;
  serviceName: string;
  category: PlatformCategory;
  link: string;
  quantity: number;
  charge: number; // in USD
  status: OrderStatus;
  startCount: number;
  remains: number;
  createdAt: string;
  refillEligible: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Order Issue' | 'Refill Request' | 'Payment / Deposit' | 'API Integration' | 'Other';
  orderId?: string;
  message: string;
  status: 'Open' | 'Answered' | 'Closed';
  createdAt: string;
}

export interface UserProfile {
  username: string;
  email: string;
  balance: number; // in USD
  totalSpent: number; // in USD
  apiKey: string;
  role: 'Reseller' | 'VIP Client' | 'Standard';
}
