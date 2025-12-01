
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

export interface ProviderProfile {
  id: string;
  name: string;
  image: string;
  coverImage?: string; // Premium
  tier: 'Starter' | 'Professional' | 'Business';
  tagline: string;
  bio: string;
  rating: number;
  reviewCount: number;
  location: string;
  joinedDate: string;
  verifications: VerificationType[];
  gallery?: string[]; // Premium
  video?: string; // Premium
  socialLinks?: { instagram?: string; website?: string }; // Premium
  responseRate?: string;
}

export interface Program {
  id: string;
  providerId: string; // Link to provider
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
  schoolId?: string; 
  recommended?: boolean; 
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

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'Parent' | 'Provider';
  participantImage: string;
  lastMessage: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface IncidentReport {
  id: string;
  programId: string;
  studentName: string;
  date: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Resolved';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved';
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface Invoice {
  id: string;
  workerId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending';
}

export interface Student {
  id: string;
  name: string;
  age: number;
  parentName: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface AttendanceRecord {
  sessionId: string;
  date: string;
  students: Student[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  parentName: string;
  location: string;
  datePosted: string;
  category: string;
  budget?: string;
}
