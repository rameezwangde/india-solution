export const serviceCatalog = [
  {
    title: 'Wedding',
    slug: 'wedding',
    icon: 'Heart',
    description: 'Complete wedding planning support for a polished, memorable celebration.',
    items: [
      'Invitations & Stationery',
      'Beauty Services, Makeup, and Mehendi',
      'Bridal & Groom Wear and Jewellery',
      'Gifts and Return Gifts',
      'Special Entries',
      'Transportation',
    ],
  },
  {
    title: 'Birthday',
    slug: 'birthday',
    icon: 'Cake',
    description: 'Creative birthday celebrations with decor, food, activities, and guest experiences.',
    items: [
      'Invitations & Stationery',
      'Birthday Decoration',
      'Fun Activities',
      'Catering & Fun Food Stations',
      'Gifts and Return Gifts',
    ],
  },
  {
    title: 'Corporate Events',
    slug: 'corporate-events',
    icon: 'BriefcaseBusiness',
    description: 'Professional event execution for business gatherings and brand moments.',
    items: [
      'Networking Events',
      'Conferences',
      'Product Launches',
      'Corporate Meetings',
    ],
  },
  {
    title: 'Catering',
    slug: 'catering',
    icon: 'Utensils',
    description: 'Curated food experiences for celebrations, formal events, and private parties.',
    items: [
      'Pure Vegetarian Cuisine',
      'Non-Vegetarian Cuisine',
      'Traditional Indian Cuisine',
      'Western Cuisine',
      'Healthy & Diet-Friendly Options',
      'Custom Cakes',
      'Sweet Treats and Fun Edibles',
    ],
  },
  {
    title: 'Pre-Wedding Ceremony',
    slug: 'pre-wedding-ceremony',
    icon: 'Gem',
    description: 'Beautifully coordinated ceremonies, parties, and pre-wedding memories.',
    items: [
      'Event Decor and Floral Arrangements',
      'Photography and Videography Services',
      'Catering Services',
      'Decorations',
      'Theme Based Parties',
    ],
  },
  {
    title: 'Trade Show and Exhibition Planning',
    slug: 'trade-show-exhibition-planning',
    icon: 'PanelsTopLeft',
    description: 'End-to-end planning for exhibitions, booth operations, and visitor management.',
    items: [
      'Attendee Registration & Ticketing',
      'Logistics & Transportation Services',
      'Custom Booth Designs & Setup',
      'Marketing & Promotion',
      'Booth Maintenance & Support',
    ],
  },
  {
    title: 'Promotions',
    slug: 'promotions',
    icon: 'Megaphone',
    description: 'Brand promotion solutions designed for visibility, recall, and engagement.',
    items: [
      'Mobile Van Advertising',
      'Digital Screens and Kiosks',
      'Sampling and Demonstrations',
      'Posters and Banners',
      'Custom-Branded Products for Effective Promotion',
    ],
  },
  {
    title: 'Special Entries',
    slug: 'special-entries',
    icon: 'Sparkles',
    description: 'Grand and memorable entries with visual effects and premium presentation.',
    items: [
      'Grand Firework Displays',
      'Sparkling Umbrella Entry',
      'Cold Pyro and Fog Effects',
      'Flower Shower Entry',
      'Drone Show Entry',
    ],
  },
  {
    title: 'Festivals',
    slug: 'festivals',
    icon: 'PartyPopper',
    description: 'Festival planning with cultural detail, decor, and crowd-ready coordination.',
    items: [
      'Dasra',
      'Ganesha Chaturthi',
      'Holi',
      'Hampi Fest',
      'Temple Festivals',
    ],
  },
  {
    title: 'House Warming',
    slug: 'house-warming',
    icon: 'House',
    description: 'Elegant house warming arrangements for family, friends, and traditional rituals.',
    items: [
      'Invitation',
      'Decorations',
      'Catering',
      'Photography and videography',
    ],
  },
  {
    title: 'Party',
    slug: 'party',
    icon: 'Music',
    description: 'Personal and milestone parties planned with thoughtful flow and details.',
    items: [
      'Graduation Party Planning',
      'Retirement Party',
      'Toast & Speech Coordination',
      'Catering Services',
      'Return Gifts & Keepsakes',
    ],
  },
  {
    title: 'Custom Gifts and Return Gifts',
    slug: 'custom-gifts-return-gifts',
    icon: 'Gift',
    description: 'Personalized gifting options that help guests remember the occasion.',
    items: [
      'Custom Key Chain',
      'Mini Me',
    ],
  },
  {
    title: 'Sporting Events',
    slug: 'sporting-events',
    icon: 'Trophy',
    description: 'Sports event coordination covering setup, registrations, safety, and logistics.',
    items: [
      'Venue Selection & Setup',
      'Ticketing & Registration',
      'Audio-Visual Equipment & Live Streaming',
      'Security & Crowd Control',
      'Transportation & Logistics',
    ],
  },
];

export const slugifyServiceItem = (value) => value
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const findServiceBySlug = (slug) => serviceCatalog.find((service) => service.slug === slug);

export const findServiceItemBySlug = (service, itemSlug) => service?.items.find((item) => slugifyServiceItem(item) === itemSlug);
