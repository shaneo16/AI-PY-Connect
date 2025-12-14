

import { PricingTier, Program, ProviderStat, School, Badge, ReferralStats, FeedPost, Conversation, IncidentReport, Student, ProviderProfile, Expense, Job, BlogPost, TeamMember, Invoice } from './types';

export const MOCK_SCHOOLS: School[] = [
  { id: 's1', name: 'Berlin International School', district: 'Dahlem', logo: 'BIS' },
  { id: 's2', name: 'John F. Kennedy School', district: 'Zehlendorf', logo: 'JFK' },
  { id: 's3', name: 'Nelson Mandela School', district: 'Wilmersdorf', logo: 'NMS' },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Activity Explorer', icon: '🌍', description: 'Booked 5 different categories', earnedDate: '2023-11-15' },
  { id: 'b2', name: 'Super Reviewer', icon: '⭐', description: 'Left 10 detailed reviews', earnedDate: '2024-01-20' },
  { id: 'b3', name: 'Art Pro', icon: '🎨', description: 'Completed 5 Art workshops', earnedDate: '2024-02-10' },
  { id: 'b4', name: 'Sporty Kid', icon: '⚽', description: 'Active in Sports for 3 months', earnedDate: '2024-03-01' },
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

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: 'pr1',
    name: 'Berlin Kickers',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tier: 'Business',
    tagline: 'Professional Youth Soccer Coaching',
    bio: 'Berlin Kickers was founded in 2010 with a mission to develop young talent through structured, fun, and competitive soccer training. Our coaches are UEFA B certified and passionate about player development.',
    rating: 4.8,
    reviewCount: 124,
    location: 'Mitte, Berlin',
    joinedDate: '2019',
    verifications: ['business_registration', 'insurance'],
    responseRate: '1 hr',
    gallery: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder
    socialLinks: { instagram: '@berlinkickers', website: 'www.berlinkickers.de' },
    isVerified: true
  },
  {
    id: 'pr2',
    name: 'The Makery',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tier: 'Professional',
    tagline: 'Creative Arts & Crafts for Kids',
    bio: 'The Makery is a space where imagination comes to life. We offer pottery, painting, and textile workshops designed to boost creativity and fine motor skills.',
    rating: 4.9,
    reviewCount: 89,
    location: 'Kreuzberg, Berlin',
    joinedDate: '2020',
    verifications: ['background_check', 'insurance'],
    responseRate: '3 hrs',
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460661631041-83824193b58d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    socialLinks: { instagram: '@themakery_berlin' },
    isVerified: true
  },
  {
    id: 'pr3',
    name: 'Sarah J.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tier: 'Starter', // Free tier, less features
    tagline: 'Experienced Math Tutor',
    bio: 'I am a university math student with 4 years of tutoring experience. I specialize in helping primary school children build confidence in numbers.',
    rating: 4.7,
    reviewCount: 56,
    location: 'Charlottenburg',
    joinedDate: '2022',
    verifications: ['background_check', 'child_safeguarding'],
    responseRate: '24 hrs',
    isVerified: true
  },
  {
    id: 'pr4',
    name: 'CampFuchs',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tier: 'Professional',
    tagline: 'Adventure Camps in Nature',
    bio: 'We organize outdoor adventure camps focusing on survival skills, teamwork, and nature appreciation.',
    rating: 4.6,
    reviewCount: 210,
    location: 'Grunewald, Berlin',
    joinedDate: '2018',
    verifications: ['background_check', 'child_safeguarding', 'insurance'],
    responseRate: '12 hrs',
    isVerified: true
  },
  {
    id: 'pr5',
    name: 'Melody Music',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tier: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tagline: 'Music School for All Ages',
    bio: 'Professional music instruction in piano, violin, and guitar. Our teachers are conservatory graduates.',
    rating: 5.0,
    reviewCount: 32,
    location: 'Prenzlauer Berg',
    joinedDate: '2021',
    verifications: ['background_check'],
    responseRate: '2 hrs',
    isVerified: true
  },
  {
    id: 'pr6',
    name: 'Lisa M.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tier: 'Starter',
    tagline: 'Reliable Weekend Babysitter',
    bio: 'I am a certified nanny with first aid training. Available for evenings and weekends.',
    rating: 4.9,
    reviewCount: 15,
    location: 'Neukölln, Berlin',
    joinedDate: '2023',
    verifications: ['background_check', 'first_aid', 'child_safeguarding'],
    responseRate: '1 hr',
    isVerified: true
  }
];

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
    ],
    isGroup: false
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
    ],
    isGroup: false
  },
  {
    id: 'c3',
    participantName: 'Junior Soccer Academy',
    participantRole: 'Provider',
    participantImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80',
    lastMessage: 'Practice canceled due to rain.',
    unreadCount: 2,
    messages: [
       { id: 'm1', senderId: 'p1', text: 'Practice canceled due to rain today.', timestamp: '12:00 PM', isMe: true }
    ],
    isGroup: true
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
    providerId: 'pr1',
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
    assignedTo: 'w1',
    assignedToName: 'Coach Mike',
    assignedToImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    enrolledCount: 16,
    maxSpots: 20
  },
  {
    id: '2',
    providerId: 'pr2',
    title: 'Creative Art Workshop',
    provider: 'The Makery',
    providerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    category: 'Arts',
    type: 'workshop',
    price: 25,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    rating: 4.9,
    reviews: 89,
    location: 'Kreuzberg, Berlin',
    coordinates: { lat: 52.4964, lng: 13.4216 },
    verified: true,
    verifications: ['background_check', 'insurance'],
    isOnline: false,
    nextSession: 'Wed, 15:30',
    recommended: true,
    assignedTo: 'w2',
    assignedToName: 'Sarah L.',
    assignedToImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    enrolledCount: 8,
    maxSpots: 12
  },
  {
    id: '3',
    providerId: 'pr3',
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
    enrolledCount: 2,
    maxSpots: 1
  },
  {
    id: '4',
    providerId: 'pr4',
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
    enrolledCount: 24,
    maxSpots: 40
  },
  {
    id: '5',
    providerId: 'pr5',
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
    seasons: [
        { id: 'S1', name: 'Summer Term', startDate: '2024-06-01', endDate: '2024-08-30', price: 450 },
        { id: 'S2', name: 'Autumn Term', startDate: '2024-09-01', endDate: '2024-12-15', price: 500 }
    ],
    enrolledCount: 4,
    maxSpots: 5
  },
  {
    id: '6',
    providerId: 'pr6',
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
    enrolledCount: 0,
    maxSpots: 1
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
      '3 Premium Team Seats Included',
      'Add more for €5/mo/user',
      'Split Payments & Commission',
      'School & Enterprise Integration',
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
  { name: 'Jan', revenue: 4000, bookings: 24, expenses: 1200 },
  { name: 'Feb', revenue: 3000, bookings: 13, expenses: 900 },
  { name: 'Mar', revenue: 2000, bookings: 58, expenses: 800 },
  { name: 'Apr', revenue: 2780, bookings: 39, expenses: 1100 },
  { name: 'May', revenue: 1890, bookings: 48, expenses: 600 },
  { name: 'Jun', revenue: 2390, bookings: 38, expenses: 1400 },
  { name: 'Jul', revenue: 3490, bookings: 43, expenses: 1000 },
];

export const PROGRAM_PERFORMANCE = [
   { id: '1', title: 'Junior Soccer Academy', revenue: 4500, bookings: 300, rating: 4.8 },
   { id: '2', title: 'Summer Camp', revenue: 12000, bookings: 48, rating: 4.9 },
   { id: '3', title: 'Private Coaching', revenue: 850, bookings: 17, rating: 5.0 },
];

export const MOCK_EXPENSES: Expense[] = [
   { id: 'e1', programId: '1', programName: 'Junior Soccer Academy', category: 'Equipment', description: 'New Cones and Balls', amount: 350, date: '2024-06-01', status: 'Approved' },
   { id: 'e2', programId: '2', programName: 'Summer Camp', category: 'Marketing', description: 'Facebook Ads', amount: 120, date: '2024-06-05', status: 'Approved' },
   { id: 'e3', programId: '1', programName: 'Junior Soccer Academy', category: 'Venue Rental', description: 'Pitch Booking June', amount: 800, date: '2024-06-10', status: 'Pending' },
];

export const MOCK_INVOICES: Invoice[] = [
    { id: 'inv1', staffId: 'w1', staffName: 'Coach Mike', amount: 850, dateGenerated: '2024-06-30', dueDate: '2024-07-15', status: 'Paid', items: [{description: 'June Coaching Hours', amount: 850}] },
    { id: 'inv2', staffId: 'w2', staffName: 'Sarah L.', amount: 420, dateGenerated: '2024-06-30', dueDate: '2024-07-15', status: 'Sent', items: [{description: 'Art Workshop Assistance', amount: 420}] },
];

export const FAQ_ITEMS = [
  {
    question: "How does the 4-step provider vetting process work?",
    answer: "We ensure safety through a strict process: 1) Identity Verification: Confirming legal identity. 2) Background Check: Requiring a valid 'Polizeiliches Führungszeugnis' (Police Clearance). 3) Certification Review: Validating first aid and educational qualifications. 4) Personal Interview: A video or in-person interview to assess suitability and values."
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
    question: "What are Klass Points?",
    answer: "Klass Points is our loyalty program. You earn points for every booking, review, and referral. Points can be redeemed for discounts, premium subscriptions, and exclusive access to events."
  }
];

export const PRODUCTS = [
  { id: 'p1', name: 'Team Jersey', price: 25, image: 'https://images.unsplash.com/photo-1577212017184-80cc25b6833c?auto=format&fit=crop&w=200&q=80' },
  { id: 'p2', name: 'Shin Guards', price: 15, image: 'https://images.unsplash.com/photo-1518605348435-e000c0dc0af3?auto=format&fit=crop&w=200&q=80' },
  { id: 'p3', name: 'Water Bottle', price: 12, image: 'https://images.unsplash.com/photo-1602143407151-cd111ca4a302?auto=format&fit=crop&w=200&q=80' },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { 
      id: 'w1', 
      name: 'Coach Mike', 
      role: 'Head Coach', 
      status: 'Active', 
      email: 'mike@berlinkickers.de',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Former Bundesliga youth player with 10 years coaching experience.',
      qualifications: ['UEFA B License', 'First Aid'],
      hourlyRate: 45
  },
  { 
      id: 'w2', 
      name: 'Sarah L.', 
      role: 'Assistant', 
      status: 'Active', 
      email: 'sarah@berlinkickers.de',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bio: 'Specializes in early childhood development and fun movement.',
      qualifications: ['Child Care Cert', 'Safeguarding'],
      hourlyRate: 30
  },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'st1', name: 'Emma Schmidt', age: 8, parentName: 'Sarah Schmidt', status: 'Present' },
  { id: 'st2', name: 'Leo Fischer', age: 10, parentName: 'Mark Fischer', status: 'Late' },
  { id: 'st3', name: 'Hanna Weber', age: 9, parentName: 'Julia Weber', status: 'Present' },
  { id: 'st4', name: 'Noah Becker', age: 8, parentName: 'Thomas Becker', status: 'Absent' },
  { id: 'st5', name: 'Lucas Meyer', age: 7, parentName: 'Anna Meyer', status: 'Present' },
];

export const MOCK_JOBS: Job[] = [
  { id: 'j1', title: 'Math Tutor for 10yr old', description: 'Looking for a patient math tutor for my son Leo. He needs help with fractions and geometry.', parentName: 'Sarah Schmidt', location: 'Zehlendorf', datePosted: '2 days ago', category: 'Education', budget: '€20-25/hr' },
  { id: 'j2', title: 'Soccer Coach for Birthday Party', description: 'Need a fun coach to organize a soccer game for a 9th birthday party.', parentName: 'Mark Fischer', location: 'Mitte', datePosted: '5 days ago', category: 'Sports', budget: '€100 fixed' },
  { id: 'j3', title: 'Weekend Babysitter', description: 'Seeking a reliable babysitter for Saturday evenings.', parentName: 'Julia Weber', location: 'Prenzlauer Berg', datePosted: '1 week ago', category: 'Life Skills', budget: '€15/hr' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Freelancing as an Educator in Berlin: The Basics',
    excerpt: 'Navigating the "Kleinunternehmer" status, health insurance, and finding your first clients in the city.',
    content: 'Berlin is a hub for freelancers, but the bureaucracy can be daunting. Here is your starter guide...',
    author: 'Klass Team',
    date: 'Jun 1, 2024',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Freelance', 'Berlin']
  },
  {
    id: 'b2',
    title: 'Working with Kids: Safety & Communication',
    excerpt: 'Best practices for managing groups, handling conflicts, and communicating effectively with parents.',
    content: 'Building trust with parents is key to retention. Here are effective strategies for communication and safety...',
    author: 'Laurie Camargo',
    date: 'May 28, 2024',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=800&q=80',
    tags: ['Safety', 'Communication']
  },
  {
    id: 'b3',
    title: 'Navigating After-School (Hort) Regulations',
    excerpt: 'Understanding the specific requirements for providing extra-curricular activities in German schools.',
    content: 'The Ganztagsschulen mandate is changing the landscape. Here is what you need to know about partnering with schools...',
    author: 'Legal Team',
    date: 'May 15, 2024',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    tags: ['Schools', 'Legal']
  },
  {
    id: 'b4',
    title: 'Marketing Your Kids Program on a Budget',
    excerpt: 'How to use local community groups and Klass Hero to fill your classes without spending a fortune.',
    content: 'You don\'t need a huge budget to attract new students. Start with community engagement...',
    author: 'Marketing Pro',
    date: 'May 10, 2024',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    tags: ['Marketing', 'Growth']
  },
  {
    id: 'b5',
    title: 'Financial Guide for Berlin Gig Workers',
    excerpt: 'Invoicing, taxes, and expense tracking for tutors and coaches in Germany.',
    content: 'Keeping your finances in order is crucial. We break down the basics of German tax law for freelancers...',
    author: 'Konstantin Pergl',
    date: 'Apr 22, 2024',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    tags: ['Finance', 'Taxes']
  }
];

export const BLOG_POSTS_PARENTS: BlogPost[] = [
    {
      id: 'p1',
      title: 'Top 10 Weekend Activities for Kids in Berlin',
      excerpt: 'From Tempelhof picnics to indoor climbing, discover the best spots for family fun.',
      content: 'Berlin offers endless possibilities...',
      author: 'Klass Team',
      date: 'Jun 10, 2024',
      image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80',
      tags: ['Activities', 'Berlin']
    },
    {
      id: 'p2',
      title: 'Choosing the Right Tutor for Your Child',
      excerpt: 'What to look for in a private educator: qualifications, personality, and teaching style.',
      content: 'Finding the right match is crucial...',
      author: 'Sarah J.',
      date: 'Jun 05, 2024',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'Tips']
    },
    {
      id: 'p3',
      title: 'Balancing Screen Time and Outdoor Play',
      excerpt: 'Strategies for modern parents to encourage healthy digital habits.',
      content: 'Screens are part of life, but balance is key...',
      author: 'Dr. Mueller',
      date: 'May 20, 2024',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      tags: ['Health', 'Lifestyle']
    }
];

export const TRENDING_SEARCHES = ['Swimming', 'Math Tutor', 'Summer Camp', 'Piano', 'Soccer'];