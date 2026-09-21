import { Branch, Milestone } from '../types';

export const COMPANY_INFO = {
  name: 'Cyden Distributors Limited',
  shortName: 'Cyden Distributors',
  taglines: [
    'Discover the finest Gin',
    'Crafted Heritage in Every Kenyan Beer',
    'World-Class Scotch Whisky & Single Malts',
    'Pure Smoothness in Premium Vodka & Rums'
  ],
  foundedYear: 2013,
  expansionYear: 2019,
  recognition: 'EABL Gold Distributor (2024)',
  principalSupplier: 'East African Breweries Limited (EABL)',
  outletsCount: '600+',
  coverageCounties: ['Uasin Gishu', 'Elgeyo Marakwet', 'Nandi County'],
  mission: 'To be the best EABL distributor in Kenya, by putting focus on our customer and ensuring optimal service delivery within our area of operations.',
  vision: 'To be the number one FMCG Distributor delivering first-class processes and profit growth.',
  story: `Cyden Distributors Limited was founded in 2013 with a vision to provide exceptional distribution services in Kenya. Starting as a small operation, the company quickly gained a reputation for reliability and innovation in the distribution industry. In 2019, recognizing growing demand for high-quality distribution services, the company reinstated and expanded operations. Cyden now has a strong presence in Uasin Gishu, Elgeyo Marakwet, and parts of Nandi County, serving over 600 outlets.`,
  contact: {
    primaryPhone: '+254 722 400 409',
    primaryPhoneRaw: '+254722400409',
    secondaryPhone: '+254 754 722 746',
    email: 'info@cydendistributors.com',
    address: 'Rupa Godowns, P.O Box 1629-30100, Eldoret, Kenya',
    town: 'Eldoret',
    country: 'Kenya',
  },
  socials: {
    instagram: 'https://www.instagram.com/cydendistributors',
    twitter: 'https://x.com/CydenDistribut1',
    facebook: 'https://www.facebook.com/profile.php?id=100070853436866',
    tiktok: 'https://vm.tiktok.com/ZMBo92seD/',
  },
  financialPartners: [
    { name: 'Absa Bank', role: 'Financial Services Support (Since 2021)' },
    { name: 'Equity Bank', role: 'Retail Financing Collaboration' },
    { name: 'KCB Bank', role: 'Retailer Credit Partner' },
    { name: 'Kuza', role: 'Trade Credit Facility' },
    { name: 'Solve Kenya', role: 'Supply Chain Financing' }
  ]
};

export const BRANCHES: Branch[] = [
  {
    id: 'branch-eldoret-main',
    name: 'Main Office & Central Warehouse',
    type: 'Main Office',
    address: 'Rupa Godowns, Malaba / Uganda Road Industrial Area, P.O Box 1629-30100, Eldoret',
    county: 'Uasin Gishu County',
    phone: '+254722400409',
    phoneDisplay: '0722 400 409',
    operatingHours: 'Mon – Sat: 7:30 AM – 6:30 PM | Sun: Closed / Emergency Dispatches',
    description: 'Central distribution headquarters and heavy logistics warehouse housing comprehensive EABL portfolio inventory with dedicated cold chain bays and delivery fleet staging.',
    coordinates: { lat: 0.515, lng: 35.288333 },
    coordinatesDisplay: '0°30\'54"N, 35°17\'18"E (0.5150° N, 35.2883° E)',
    landmarks: [
      'Rupa Mills & Godowns Complex',
      'Off Uganda Road / Malaba Road, Kapsoya & Eastern Ave Corridor',
      'Near Rupa\'s Mall Industrial Sector, Eldoret'
    ],
    mapEmbedUrl: 'https://maps.google.com/maps?q=0.515000,35.288333+(Cyden+Distributors+Limited+-+Rupa+Godowns+Eldoret)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=0.515000,35.288333',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=0.515000,35.288333',
  },
  {
    id: 'branch-iten-substore',
    name: 'Iten Sub-Store & Depository',
    type: 'Sub-Store',
    address: 'Sitet Building, Iten Town Center, Iten-Kabarnet Road (C51)',
    county: 'Elgeyo Marakwet County',
    phone: '+254754722746',
    phoneDisplay: '0754 722 746',
    operatingHours: 'Mon – Sat: 8:00 AM – 6:00 PM',
    description: 'Highland distribution sub-depot serving retail accounts, hotels, and tourist lounges across Iten township and the Kerio Valley escarpment rim with rapid weekly replenishment.',
    coordinates: { lat: 0.6732, lng: 35.5085 },
    coordinatesDisplay: '0°40\'23"N, 35°30\'30"E (0.6732° N, 35.5085° E)',
    landmarks: [
      'Sitet Building, Iten Town Center',
      'Along Eldoret-Iten-Kabarnet Highway (C51)',
      'Home of Champions Escarpment Hub'
    ],
    mapEmbedUrl: 'https://maps.google.com/maps?q=0.673200,35.508500+(Cyden+Distributors+-+Iten+Sub-Store+Sitet+Building)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=0.673200,35.508500',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=0.673200,35.508500',
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: '2013',
    title: 'Foundation of Cyden',
    description: 'Company founded with a steadfast vision to deliver exceptional, reliable beverage distribution services in Kenya.',
  },
  {
    year: '2019',
    title: 'Reinstatement & Strategic Expansion',
    description: 'Reinstated and significantly expanded operations with modernized fleet management and scaled warehouse facilities.',
  },
  {
    year: '2019–2020',
    title: 'Regional Market Expansion (600+ Outlets)',
    description: 'Broadened supply coverage across Uasin Gishu, Elgeyo Marakwet, and Nandi County, achieving a network milestone of over 600 retail and hospitality outlets.',
  },
  {
    year: '2021',
    title: 'Absa Bank Financial Partnership',
    description: 'Formed strategic corporate alliance with Absa Bank for commercial credit lines and enhanced working capital distribution solutions.',
  },
  {
    year: '2022',
    title: 'Technology Integration in Logistics',
    description: 'Implemented modern digital inventory dispatch, GPS route optimization, and digital delivery confirmation to eliminate retail stockouts.',
  },
  {
    year: '2022',
    title: 'Retail Financing Consortium',
    description: 'Collaborated with Kuza, Equity Bank, KCB Bank, and Solve Kenya to provide flexible retailer inventory financing, empowering bar owners to scale up.',
  },
  {
    year: '2023',
    title: 'Leading EABL Distributor Recognition',
    description: 'Officially recognized by East African Breweries Limited as one of the Leading Distributors in Kenya for operational excellence.',
  },
  {
    year: '2024',
    title: 'EABL Gold Distributor Award',
    description: 'Conferred the prestigious Gold Distributor distinction by EABL for outstanding sales volume, retail partner satisfaction, and exemplary supply chain standards.',
    highlight: true,
  }
];

export const BRANDS = [
  { name: 'Tusker', category: 'Beer', logoText: 'TUSKER', color: '#DEAB09', desc: 'Brewed with 100% African Ingredients' },
  { name: 'Guinness', category: 'Stout', logoText: 'GUINNESS', color: '#C69214', desc: 'Extra Stout & Smooth' },
  { name: 'White Cap', category: 'Beer', logoText: 'WHITE CAP', color: '#1B3E6F', desc: 'Clean, Crisp Mountain Brew' },
  { name: 'Johnnie Walker', category: 'Whisky', logoText: 'JOHNNIE WALKER', color: '#9B2C2C', desc: 'Keep Walking' },
  { name: 'Smirnoff', category: 'Vodka', logoText: 'SMIRNOFF', color: '#B91C1C', desc: 'Triple Distilled Purity' },
  { name: 'Gilbeys', category: 'Gin', logoText: 'GILBEY’S', color: '#047857', desc: 'Special Dry Botanical Gin' },
  { name: 'Gordons', category: 'Gin', logoText: 'GORDON’S', color: '#D97706', desc: 'London Dry Gin Heritage' },
  { name: 'Captain Morgan', category: 'Rum', logoText: 'CAPTAIN MORGAN', color: '#9A3412', desc: 'Spice & Oak-Aged Dark Rum' },
  { name: 'Tanqueray', category: 'Gin', logoText: 'TANQUERAY', color: '#065F46', desc: 'Fresh Citrus Botanicals' },
  { name: 'Baileys', category: 'Liquor', logoText: 'BAILEYS', color: '#78350F', desc: 'Original Irish Cream' },
];
