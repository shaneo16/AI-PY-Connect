
import { PricingTier, Program, ProviderStat } from './types';

export const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    title: 'Junior Soccer Academy',
    provider: 'Berlin Kickers',
    providerImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Sports',
    type: 'class',
    price: 15,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 124,
    location: 'Mitte, Berlin',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    verified: true,
    isOnline: true,
    nextSession: 'Tue, 16:00',
  },
  {
    id: '2',
    title: 'Creative Art Workshop',
    provider: 'The Makery',
    providerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Arts',
    type: 'workshop',
    price: 25,
    image: 'https://images.unsplash.com/photo-1460661611711-2117027e8ced?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 89,
    location: 'Kreuzberg, Berlin',
    coordinates: { lat: 52.4964, lng: 13.4216 },
    verified: true,
    isOnline: false,
    nextSession: 'Wed, 15:30',
  },
  {
    id: '3',
    title: 'Math Whiz Tutoring',
    provider: 'Sarah J.',
    providerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Education',
    type: 'service',
    price: 30,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 56,
    location: 'Charlottenburg',
    coordinates: { lat: 52.5163, lng: 13.3077 },
    verified: true,
    isOnline: true,
    nextSession: 'Flexible Schedule',
  },
  {
    id: '4',
    title: 'Summer Adventure Camp',
    provider: 'CampFuchs',
    providerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Camps',
    type: 'camp',
    price: 250,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 210,
    location: 'Grunewald, Berlin',
    coordinates: { lat: 52.4676, lng: 13.2597 },
    verified: true,
    isOnline: false,
    nextSession: 'July 15 - 20',
  },
  {
    id: '5',
    title: 'Piano for Beginners',
    provider: 'Melody Music',
    providerImage: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Music',
    type: 'class',
    price: 40,
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 32,
    location: 'Prenzlauer Berg',
    coordinates: { lat: 52.5422, lng: 13.4140 },
    verified: true,
    isOnline: false,
    nextSession: 'Thu, 14:00',
  },
  {
    id: '6',
    title: 'Weekend Babysitting',
    provider: 'Lisa M.',
    providerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Life Skills',
    type: 'service',
    price: 18,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 15,
    location: 'Neukölln, Berlin',
    coordinates: { lat: 52.4812, lng: 13.4353 },
    verified: true,
    isOnline: true,
    nextSession: 'By Request',
  },
];

export const PARENT_PRICING: PricingTier[] = [
  {
    name: 'Explorer Family',
    price: 'Free',
    period: 'forever',
    tagline: 'Perfect for trying us out',
    features: [
      'Browse all vetted programs',
      'Book 2 provider programs/mo',
      'Read reviews and ratings',
      'Community access',
    ],
  },
  {
    name: 'Active Family',
    price: '€8',
    period: 'month',
    tagline: "Build your child's future",
    recommended: true,
    features: [
      'Everything in Explorer',
      'Unlimited bookings',
      'Child progress tracking',
      'Provider messaging',
      '1 free cancellation/mo',
    ],
  },
];

export const PROVIDER_PRICING: PricingTier[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    tagline: 'Get discovered by local families',
    features: [
      'Basic profile',
      'List up to 2 programs',
      '18% platform commission',
      'Basic booking tools',
    ],
  },
  {
    name: 'Professional',
    price: '€8',
    period: 'month',
    tagline: 'Grow your business',
    recommended: true,
    features: [
      'Enhanced profile (gallery/video)',
      'List up to 5 programs',
      '12% commission (Save €2/booking)',
      'Analytics dashboard',
    ],
  },
];

export const PROVIDER_STATS: ProviderStat[] = [
  { name: 'Total Revenue', value: 12500, change: '+12%' },
  { name: 'Active Bookings', value: 45, change: '+5%' },
  { name: 'Profile Views', value: 1205, change: '+23%' },
  { name: 'Avg Rating', value: 4.9 },
];

export const ANALYTICS_DATA = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 3000, bookings: 13 },
  { name: 'Mar', revenue: 2000, bookings: 58 },
  { name: 'Apr', revenue: 2780, bookings: 39 },
  { name: 'May', revenue: 1890, bookings: 48 },
  { name: 'Jun', revenue: 2390, bookings: 38 },
  { name: 'Jul', revenue: 3490, bookings: 43 },
];

export const FAQ_ITEMS = [
  {
    question: "How are providers vetted?",
    answer: "Every provider on Prime Youth Connect undergoes a rigorous verification process. We check their identity, certifications, and safety records. We also interview them to ensure they align with our educational and safety standards."
  },
  {
    question: "Is there a free trial for the Active Family plan?",
    answer: "You can start with the Explorer Family plan for free, forever. It allows you to browse and book a limited number of programs. Upgrading to Active Family gives you unlimited access and better cancellation policies."
  },
  {
    question: "Can I cancel a booking?",
    answer: "Yes, cancellations are possible. Explorer families follow standard provider policies. Active Family members get 1 free platform cancellation per month up to €50."
  },
  {
    question: "Do you offer programs for adults?",
    answer: "Currently, our primary focus is on youth education and recreation (ages 4-18). However, we are exploring adult programs and family workshops for our future expansion."
  }
];
