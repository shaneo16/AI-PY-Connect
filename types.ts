export enum UserRole {
  GUEST = 'GUEST',
  PARENT = 'PARENT',
  PROVIDER = 'PROVIDER',
}

export interface School {
  id: string;
  name: string;
  district: string;
  logo: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate?: string;
}

export type VerificationType = 'background_check' | 'first_aid' | 'child_safeguarding' | 'insurance';

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
  verifications: VerificationType[];
  nextSession: string;
  coordinates?: { lat: number; lng: number };
  isOnline?: boolean;
  schoolId?: string; // Linked to specific school
  recommended?: boolean; // AI recommendation flag
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

export interface PointHistory {
  id: string;
  action: string;
  points: number;
  date: string;
}

export interface ReferralStats {
  code: string;
  totalReferrals: number;
  earnedPoints: number;
  milestones: { label: string; achieved: boolean }[];
}

export interface FeedPost {
  id: string;
  providerName: string;
  providerImage: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked?: boolean;
}