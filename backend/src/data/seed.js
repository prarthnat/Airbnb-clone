/**
 * seed.js — Mock data matching the Candolim reference listing exactly.
 */

const listing = {
  id: 'villa-azure-1',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  description: `🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴

Show less`,
  location: {
    city: 'Candolim',
    region: 'Goa',
    country: 'India',
    lat: 15.5189,
    lng: 73.7622,
    neighborhood: 'Candolim, Goa, India',
    neighbourhoodHighlights:
      'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.',
    directions: 'Exact location will be provided after booking.',
  },
  stats: {
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  },
  rating: 4.95,
  reviewCount: 19,
  pricing: {
    basePrice: 5699.8,
    totalPrice: 28499,
    nights: 5,
    currency: 'INR',
    minimumNights: 1,
    checkIn: '2026-10-18',
    checkOut: '2026-10-23',
    freeCancelBefore: '17 October',
  },
  badges: [{ id: 'guest-favorite', label: 'Guest favourite', icon: 'heart' }],
  highlights: [
    {
      id: 'h1',
      icon: 'outdoor',
      title: 'Outdoor entertainment',
      description: 'The pool and alfresco dining are great for summer trips.',
    },
    {
      id: 'h2',
      icon: 'cool',
      title: 'Designed for staying cool',
      description: 'Beat the heat with the A/C and ceiling fan.',
    },
    {
      id: 'h3',
      icon: 'checkin',
      title: 'Self check-in',
      description: 'You can check in with the building staff.',
    },
  ],
  sleepSpaces: [
    { id: 's1', name: 'Bedroom', description: '1 double bed', photoCategory: 'Bedroom' },
    { id: 's2', name: 'Living room', description: '1 sofa', photoCategory: 'Living room 2' },
  ],
  amenities: [
    {
        id: "a1",
        category: "Kitchen and dining",
        icon: "kitchen",
        name: "Kitchen",
        available: true
    },
    {
        id: "a2",
        category: "Internet and office",
        icon: "wifi",
        name: "Wifi",
        available: true
    },
    {
        id: "a3",
        category: "Internet and office",
        icon: "workspace",
        name: "Dedicated workspace",
        available: true
    },
    {
        id: "a4",
        category: "Parking and facilities",
        icon: "car",
        name: "Free parking on premises",
        available: true
    },
    {
        id: "a5",
        category: "Parking and facilities",
        icon: "pool",
        name: "Pool",
        available: true
    },
    {
        id: "a6",
        category: "Parking and facilities",
        icon: "hot-tub",
        name: "Hot tub",
        available: true
    },
    {
        id: "a7",
        category: "Services",
        icon: "pets",
        name: "Pets allowed",
        available: true
    },
    {
        id: "a8",
        category: "Home safety",
        icon: "camera",
        name: "Exterior security cameras on property",
        available: true
    },
    {
        id: "a9",
        category: "Home safety",
        icon: "co-alarm-crossed",
        name: "Carbon monoxide alarm",
        available: false
    },
    {
        id: "a10",
        category: "Home safety",
        icon: "smoke-alarm-crossed",
        name: "Smoke alarm",
        available: false
    },
    {
        id: "a11",
        category: "Bathroom",
        icon: "hairdryer",
        name: "Hairdryer",
        available: true
    },
    {
        id: "a12",
        category: "Bathroom",
        icon: "cleaning",
        name: "Cleaning products",
        available: true
    },
    {
        id: "a13",
        category: "Bathroom",
        icon: "shampoo",
        name: "Shampoo",
        available: true
    },
    {
        id: "a14",
        category: "Bathroom",
        icon: "hot-water",
        name: "Hot water",
        available: true
    },
    {
        id: "a15",
        category: "Bathroom",
        icon: "shower-gel",
        name: "Shower gel",
        available: true
    },
    {
        id: "a16",
        category: "Bedroom and laundry",
        icon: "washer",
        name: "Washing machine",
        available: true
    },
    {
        id: "a17",
        category: "Bedroom and laundry",
        icon: "hangers",
        name: "Hangers",
        available: true
    },
    {
        id: "a18",
        category: "Bedroom and laundry",
        icon: "bed-linen",
        name: "Bed linen",
        available: true
    },
    {
        id: "a19",
        category: "Bedroom and laundry",
        icon: "blinds",
        name: "Room-darkening blinds",
        available: true
    },
    {
        id: "a20",
        category: "Bedroom and laundry",
        icon: "iron",
        name: "Iron",
        available: true
    },
    {
        id: "a21",
        category: "Bedroom and laundry",
        icon: "wardrobe",
        name: "Clothes storage",
        available: true
    },
    {
        id: "a22",
        category: "Bedroom and laundry",
        icon: "cot",
        name: "Cot",
        available: true
    },
    {
        id: "a23",
        category: "Entertainment",
        icon: "tv",
        name: "TV",
        available: true
    },
    {
        id: "a24",
        category: "Family",
        icon: "cot",
        name: "Cot",
        available: true
    },
    {
        id: "a25",
        category: "Heating and cooling",
        icon: "ac",
        name: "Air conditioning",
        available: true
    },
    {
        id: "a26",
        category: "Heating and cooling",
        icon: "fan",
        name: "Ceiling fan",
        available: true
    },
    {
        id: "a27",
        category: "Kitchen and dining",
        icon: "fridge",
        name: "Fridge",
        available: true
    },
    {
        id: "a28",
        category: "Kitchen and dining",
        icon: "freezer",
        name: "Freezer",
        available: true
    },
    {
        id: "a29",
        category: "Kitchen and dining",
        icon: "microwave",
        name: "Microwave",
        available: true
    },
    {
        id: "a30",
        category: "Kitchen and dining",
        icon: "cooking-basics",
        name: "Cooking basics",
        available: true
    },
    {
        id: "a31",
        category: "Kitchen and dining",
        icon: "crockery",
        name: "Crockery and cutlery",
        available: true
    },
    {
        id: "a32",
        category: "Kitchen and dining",
        icon: "kettle",
        name: "Kettle",
        available: true
    },
    {
        id: "a33",
        category: "Kitchen and dining",
        icon: "coffee-maker",
        name: "Coffee",
        available: true
    },
    {
        id: "a34",
        category: "Kitchen and dining",
        icon: "wine",
        name: "Wine glasses",
        available: true
    },
    {
        id: "a35",
        category: "Kitchen and dining",
        icon: "toaster",
        name: "Toaster",
        available: true
    },
    {
        id: "a36",
        category: "Kitchen and dining",
        icon: "blender",
        name: "Blender",
        available: true
    },
    {
        id: "a37",
        category: "Kitchen and dining",
        icon: "cooker",
        name: "Cooker",
        available: true
    },
    {
        id: "a38",
        category: "Location features",
        icon: "entrance",
        name: "Private entrance",
        available: true
    },
    {
        id: "a39",
        category: "Outdoor",
        icon: "patio",
        name: "Patio or balcony",
        available: true
    },
    {
        id: "a40",
        category: "Outdoor",
        icon: "outdoor-dining",
        name: "Outdoor dining area",
        available: true
    },
    {
        id: "a41",
        category: "Parking and facilities",
        icon: "gym",
        name: "Gym",
        available: true
    },
    {
        id: "a42",
        category: "Services",
        icon: "cleaning",
        name: "Cleaning available during stay",
        available: true
    },
    {
        id: "a43",
        category: "Services",
        icon: "calendar",
        name: "Long-term stays allowed",
        available: true
    },
    {
        id: "a44",
        category: "Services",
        icon: "self-checkin",
        name: "Self check-in",
        available: true
    }
],
  houseRules: [
    'Check-in after 2:00 pm',
    'Checkout before 11:00 am',
    '3 guests maximum',
  ],
  cancellationPolicy:
    'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. Review this host\'s full policy for details.',
  safetyInfo: [
    'Carbon monoxide alarm not reported',
    'Smoke alarm not reported',
    'Exterior security cameras on property',
  ],
  hostId: 'host-sophia-1',
  photos: [
    {
        id: 'p1',
        url: '/reference/P2_L1.jpeg',
        caption: 'Living room wide angle',
        category: 'Living Room',
        featured: true
    },
    {
        id: 'p2',
        url: '/reference/P3_L1.jpeg',
        caption: 'Living room seating area',
        category: 'Living Room',
        featured: true
    },
    {
        id: 'p3',
        url: '/reference/living_room_1_3_new.jpg',
        caption: 'Living room TV unit',
        category: 'Living Room',
        featured: true
    },
    {
        id: 'lr2_1',
        url: '/reference/living_room_2_1.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_2',
        url: '/reference/living_room_2_2.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_3',
        url: '/reference/living_room_2_3.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_4',
        url: '/reference/living_room_2_4.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_5',
        url: '/reference/living_room_2_5.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_6',
        url: '/reference/living_room_2_6.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'lr2_7',
        url: '/reference/living_room_2_7.jpg',
        caption: 'Living room detail',
        category: 'Living room 2',
        featured: true
    },
    {
        id: 'k_1',
        url: '/reference/kitchen_1.jpg',
        caption: 'Kitchen view',
        category: 'Kitchen',
        featured: true
    },
    {
        id: 'k_2',
        url: '/reference/kitchen_2.jpg',
        caption: 'Kitchen view',
        category: 'Kitchen',
        featured: true
    },
    {
        id: 'b_1',
        url: '/reference/bedroom_1.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'b_2',
        url: '/reference/bedroom_2.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'b_3',
        url: '/reference/bedroom_3.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'b_4',
        url: '/reference/bedroom_4.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'b_5',
        url: '/reference/bedroom_5.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'b_6',
        url: '/reference/bedroom_6.jpg',
        caption: 'Bedroom view',
        category: 'Bedroom',
        featured: true
    },
    {
        id: 'ba_1',
        url: '/reference/bathroom_1.jpg',
        caption: 'Bathroom view',
        category: 'Bathroom',
        featured: true
    },
    {
        id: 'g_1',
        url: '/reference/gym_1.jpg',
        caption: 'Gym view',
        category: 'Gym',
        featured: true
    },
    {
        id: 'g_2',
        url: '/reference/gym_2.jpg',
        caption: 'Gym view',
        category: 'Gym',
        featured: true
    },
    {
        id: 'g_3',
        url: '/reference/gym_3.jpg',
        caption: 'Gym view',
        category: 'Gym',
        featured: true
    },
    {
        id: 'g_4',
        url: '/reference/gym_4.jpg',
        caption: 'Gym view',
        category: 'Gym',
        featured: true
    },
    {
        id: 'g_5',
        url: '/reference/gym_5.jpg',
        caption: 'Gym view',
        category: 'Gym',
        featured: true
    },
    {
        id: 'e_1',
        url: '/reference/exterior_1.jpg',
        caption: 'Exterior view',
        category: 'Exterior',
        featured: true
    },
    {
        id: 'e_2',
        url: '/reference/exterior_2.jpg',
        caption: 'Exterior view',
        category: 'Exterior',
        featured: true
    },
    {
        id: 'e_3',
        url: '/reference/exterior_3.jpg',
        caption: 'Exterior view',
        category: 'Exterior',
        featured: true
    },
    {
        id: 'e_4',
        url: '/reference/exterior_4.jpg',
        caption: 'Exterior view',
        category: 'Exterior',
        featured: true
    },
    {
        id: 'e_6',
        url: '/reference/exterior_6.jpg',
        caption: 'Exterior view',
        category: 'Exterior',
        featured: true
    },
    {
        id: 'pool_1',
        url: '/reference/pool_1.jpg',
        caption: 'Pool view',
        category: 'Pool',
        featured: true
    },
    {
        id: 'pool_2',
        url: '/reference/pool_2.jpg',
        caption: 'Pool view',
        category: 'Pool',
        featured: true
    },
    {
        id: 'a_0',
        url: '/reference/additional_0.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_1',
        url: '/reference/additional_1.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_2',
        url: '/reference/additional_2.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_3',
        url: '/reference/additional_3.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_4',
        url: '/reference/additional_4.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_5',
        url: '/reference/additional_5.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_6',
        url: '/reference/additional_6.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_7',
        url: '/reference/additional_7.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_8',
        url: '/reference/additional_8.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    },
    {
        id: 'a_9',
        url: '/reference/additional_9.jpg',
        caption: 'Additional view',
        category: 'Additional photos',
        featured: true
    }
],
  nearbyStays: [
    {
      id: 'n1',
      title: 'Beautiful Studio with a view to die for',
      price: 23600,
      rating: 4.91,
      image: '/reference/nearby-1.png',
    },
    {
      id: 'n2',
      title: 'NAQAB - 1bhk with private pool',
      price: 42218,
      rating: 4.95,
      image: '/reference/nearby-2.png',
    },
    {
      id: 'n3',
      title: 'Greentique Luxury Flat with plunge pool, Calangute',
      price: 44506,
      rating: 4.94,
      image: '/reference/nearby-3.png',
    },
    {
      id: 'n4',
      title: 'The Tropical Studio | 5 mins to Beach',
      price: 22824,
      rating: 4.96,
      image: '/reference/nearby-4.png',
    },
    {
      id: 'n5',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      price: 39942,
      rating: 4.95,
      image: '/reference/nearby-5.png',
    },
    {
      id: 'n6',
      title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
      price: 45648,
      rating: 5.0,
      image: '/reference/nearby-6.png',
    },
    {
      id: 'n7',
      title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
      price: 48786,
      rating: 4.93,
      image: '/reference/nearby-7.png',
    },
    {
      id: 'n8',
      title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
      price: 22824,
      rating: 4.92,
      image: '/reference/nearby-8.png',
    },
  ],
};

const reviews = [
  {
    id: 'r1',
    listingId: 'villa-azure-1',
    author: 'Amit',
    avatar: null,
    rating: 4,
    date: '2026-07-04',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
    location: 'Mumbai, India',
    yearsOnAirbnb: null,
    monthsOnAirbnb: 2,
    initial: 'A',
    initialColor: '#d8c4a6',
  },
  {
    id: 'r2',
    listingId: 'villa-azure-1',
    author: 'Aheesh',
    avatar: null,
    rating: 4,
    date: '2026-06-27',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    location: 'Delhi, India',
    yearsOnAirbnb: 3,
    monthsOnAirbnb: null,
    initial: 'A',
    initialColor: '#d1b6a4',
  },
  {
    id: 'r3',
    listingId: 'villa-azure-1',
    author: 'Samiksha',
    avatar: null,
    rating: 5,
    date: '2026-05-15',
    text: 'the host nitish was really great help',
    location: 'Bangalore, India',
    yearsOnAirbnb: null,
    monthsOnAirbnb: 8,
    initial: 'S',
    initialColor: '#c9b6da',
  },
  {
    id: 'r4',
    listingId: 'villa-azure-1',
    author: 'Vedant',
    avatar: null,
    rating: 5,
    date: '2026-05-10',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The host was incredibly accommodating and made our stay even more enjoyable. Would definitely recommend this property to anyone looking for a great stay in Goa.',
    location: 'Pune, India',
    yearsOnAirbnb: 4,
    monthsOnAirbnb: null,
    initial: 'V',
    initialColor: '#b0c4d8',
  },
  {
    id: 'r5',
    listingId: 'villa-azure-1',
    author: 'Vaibhav S',
    avatar: null,
    rating: 5,
    date: '2026-05-08',
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    location: 'Hyderabad, India',
    yearsOnAirbnb: 3,
    monthsOnAirbnb: null,
    initial: 'V',
    initialColor: '#b9cfae',
  },
  {
    id: 'r6',
    listingId: 'villa-azure-1',
    author: 'Mohd',
    avatar: null,
    rating: 5,
    date: '2026-05-05',
    text: 'Great place. Exactly as described in the listing.',
    location: 'Chennai, India',
    yearsOnAirbnb: 5,
    monthsOnAirbnb: null,
    initial: 'M',
    initialColor: '#aebfce',
  },
];

const host = {
  id: 'host-sophia-1',
  name: 'Mirashya Homes',
  firstName: 'Mirashya',
  avatar: '/reference/mirashya-logo.png',
  memberSince: 'April 2024',
  isSuperhost: false,
  yearsHosting: 2,
  responseRate: 100,
  responseTime: 'Within an hour',
  totalReviews: 1463,
  rating: 4.68,
  bio: 'Welcome to Mirashya Homes! We specialise in curated stays across Goa, offering thoughtfully designed apartments with premium amenities. Our team is dedicated to making your holiday memorable.',
  languages: ['English', 'Hindi', 'Konkani'],
  verifiedIdentity: true,
  totalListings: 12,
  personalInfo: [
    { icon: 'lightbulb', text: 'Born in the 80s' },
    { icon: 'school', text: 'Where I went to school: NICMAR GOA' },
  ],
  coHosts: [
    { name: 'Sharath', avatar: null, initial: 'S', color: '#d5c0aa' },
    { name: 'Aman Dev Pahwa', avatar: null, initial: 'A', color: '#b8c8d8' },
    { name: 'Maria Karen Priyanka', avatar: null, initial: 'M', color: '#d8b8c8' },
    { name: 'Simran', avatar: null, initial: 'S', color: '#c1d8b8' },
    { name: 'Pallavi', avatar: null, initial: 'P', color: '#d8d0b8' },
    { name: 'Sanyukta', avatar: null, initial: 'S', color: '#b8d6d8' },
    { name: 'Shruti', avatar: null, initial: 'S', color: '#E8B4B8' },
    { name: 'Amisha', avatar: null, initial: 'A', color: '#A8C5DA' },
  ],
};

module.exports = { listing, reviews, host };
