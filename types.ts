export enum UserRole {
  GUEST = 'GUEST',
  PARENT = 'PARENT',
  PROVIDER = 'PROVIDER',
}

export interface Program {
  id: string;
  title: string;
  provider: string;
  providerImage: string;
  category: 'Sports' | 'Arts' | 'Education' | 'Camps' | 'Music' | 'Life Skills';
  type: 'class' | 'workshop' | 'service' | 'camp';
  price: number;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  nextSession: string;
  coordinates?: { lat: number; lng: number };
  isOnline?: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
}

export interface ProviderStat {
  name: string;
  value: number;
  change?: string;
}