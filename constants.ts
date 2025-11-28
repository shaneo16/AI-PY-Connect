

import { PricingTier, Program, ProviderStat, School, Badge, ReferralStats, FeedPost, Conversation, IncidentReport } from './types';

export const MOCK_SCHOOLS: School[] = [
  { id: 's1', name: 'Berlin International School', district: 'Dahlem', logo: 'BIS' },
  { id: 's2', name: 'John F. Kennedy School', district: 'Zehlendorf', logo: 'JFK' },
  { id: 's3', name: 'Nelson Mandela School', district: 'Wilmersdorf', logo: 'NMS' },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Activity Explorer', icon: '🌍', description: 'Booked 5 different categories', earnedDate: '2023-11-15' },
  { id: 'b2', name: 'Super Reviewer', icon: '⭐', description: 'Left 10 detailed reviews', earnedDate: '2024-01-20' },
  { id: 'b3', name: 'Early Bird', icon: '🌅', description: 'Booked 2 weeks in advance', earnedDate: '2024-03-05' },
];

export const MOCK_REFERRAL_STATS: ReferralStats = {
  code: 'SARAH-BERLIN-24',
  totalReferrals: 3,
  earnedPoints: 600,
  milestones: [
    { label: 'Refer 1 Friend (200 pts)', achieved: true },
    { label: 'Refer 5 Friends (1000 pts)', achieved: false },
    { label: 'Refer a Provider (300 pts)', achieved: true },
  ]
};

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: 'f1',
    providerName: 'Berlin Kickers',
    providerImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Great session today with the U10 group! Working on dribbling skills. ⚽️ #youthsoccer #berlin',
    likes: 45,
    comments: 3,
    timeAgo: '2h ago',
    liked: true,
  },
  {
    id: 'f2',
    providerName: 'The Makery',
    providerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Look at these amazing clay creations from our weekend workshop! 🎨✨ Next class starts Saturday.',
    likes: 89,
    comments: 12,
    timeAgo: '5h ago',
    liked: false,
  },
  {
    id: 'f3',
    providerName: 'CampFuchs',
    providerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Summer camp registration is now OPEN! Early bird spots are filling up fast. 🌲⛺️',
    likes: 120,
    comments: 24,
    timeAgo: '1d ago',
    liked: false,
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participantName: 'Berlin Kickers',
    participantRole: 'Provider',
    participantImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Don\'t forget shin guards for tomorrow!',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'p1', text: 'Hi Sarah, just a reminder about the match tomorrow.', timestamp: '10:00 AM', isMe: false },
      { id: 'm2', senderId: 'me', text: 'Thanks! What time should we arrive?', timestamp: '10:05 AM', isMe: true },
      { id: 'm3', senderId: 'p1', text: 'Please be there by 9:30 AM for warm-ups.', timestamp: '10:06 AM', isMe: false },
      { id: 'm4', senderId: 'p1', text: 'Don\'t forget shin guards for tomorrow!', timestamp: '10:07 AM', isMe: false },
    ]
  },
  {
    id: 'c2',
    participantName: 'Sarah J.',
    participantRole: 'Provider',
    participantImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Leo is making great progress with fractions.',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'p2', text: 'Leo is making great progress with fractions.', timestamp: 'Yesterday', isMe: false },
      { id: 'm2', senderId: 'me', text: 'That is wonderful to hear! Thanks Sarah.', timestamp: 'Yesterday', isMe: true },
    ]
  }
];

export const MOCK_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc1',
    programId: '1',
    studentName: 'Tom Muller',
    date: '2024-06-10',
    description: 'Scraped knee during warm-up drill. Cleaned and bandaged.',
    severity: 'Low',
    status: 'Resolved'
  },
  {
    id: 'inc2',
    programId: '1',
    studentName: 'Lisa Schmidt',
    date: '2024-06-12',
    description: 'Argument with another student involving pushing.',
    severity: 'Medium',
    status: 'Open'
  }
];

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
    verifications: ['background_check', 'first_aid', 'child_safeguarding'],
    isOnline: true,
    nextSession: 'Tue, 16:00',
    schoolId: 's3',
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
    verifications: ['background_check', 'insurance'],
    isOnline: false,
    nextSession: 'Wed, 15:30',
    recommended: true,
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
    verifications: ['background_check', 'child_safeguarding', 'first_aid', 'insurance'],
    isOnline: true,
    nextSession: 'Flexible Schedule',
    schoolId: 's1',
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
    verifications: ['background_check', 'child_safeguarding', 'insurance'],
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
    verifications: ['background_check'],
    isOnline: false,
    nextSession: 'Thu, 14:00',
    schoolId: 's2',
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
    verifications: ['background_check', 'first_aid', 'child_safeguarding'],
    isOnline: true,
    nextSession: 'By Request',
    recommended: true,
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
  {
    name: 'Business Plus',
    price: '€48',
    period: 'month',
    tagline: 'Full Business Control',
    features: [
      'Unlimited Program listings',
      '8% platform commission',
      'School & Enterprise Integration',
      'Cancellation Protection',
      'Advanced Marketing Tools',
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
  },
  {
    question: "What are Prime Points?",
    answer: "Prime Points is our loyalty program. You earn points for every booking, review, and referral. Points can be redeemed for discounts, premium subscriptions, and exclusive access to events."
  }
];

export const PRODUCTS = [
  { id: 'p1', name: 'Team Jersey', price: 25, image: 'https://images.unsplash.com/photo-1577212017184-80cc25b6833c?auto=format&fit=crop&w=200&q=80' },
  { id: 'p2', name: 'Shin Guards', price: 15, image: 'https://images.unsplash.com/photo-1518605348435-e000c0dc0af3?auto=format&fit=crop&w=200&q=80' },
  { id: 'p3', name: 'Water Bottle', price: 12, image: 'https://images.unsplash.com/photo-1602143407151-cd111ca4a302?auto=format&fit=crop&w=200&q=80' },
];

export const MOCK_WORKERS = [
  { id: 'w1', name: 'Coach Mike', role: 'Head Coach', status: 'Active' },
  { id: 'w2', name: 'Sarah L.', role: 'Assistant', status: 'Active' },
  { id: 'w3', name: 'Tom B.', role: 'Intern', status: 'Inactive' },
];
