import type { IoniconName } from '../components/ui/IconBadge';

export interface WhyKysamItem {
  icon: IoniconName;
  label: string;
  description: string;
}

export interface ServiceContent {
  slug: string;
  name: string;
  shortDescription: string;
  icon: IoniconName;
}

export interface FactCard {
  stat: string;
  label: string;
}

export interface ClientContent {
  name: string;
  description: string;
  sector: string;
  website: string;
}

// ── Home ──────────────────────────────────────────────────────────────────
export const homeContent = {
  eyebrow: 'IT SERVICES · DELIVERY PARTNER · TRANSIT TECHNOLOGY',
  heading: 'Technology\nDelivery.\nBusiness\nOutcomes.',
  subtext:
    'We specialise in Automatic Fare Collection systems, enterprise software, and transit technology — operating as a long-term delivery partner to Aurionpro Solutions and Sileo.',
  factCards: [
    { stat: 'AFC Systems', label: 'End-to-end Automatic Fare Collection delivery' },
    { stat: 'Vendor Partner', label: 'Aurionpro Solutions & Sileo — long-term engagements' },
    { stat: 'Full-Cycle Delivery', label: 'Development · QA · Integration · Managed Support' },
  ] as FactCard[],
} as const;

export const whyKysam: WhyKysamItem[] = [
  {
    icon: 'bus-outline',
    label: 'Automatic Fare\nCollection & Transit',
    description: 'Practical AFC experience — ticketing systems, back-office platforms, smart mobility integration, and live deployments.',
  },
  {
    icon: 'shield-checkmark-outline',
    label: 'Proven\nDelivery',
    description: 'Long-term vendor to Aurionpro Solutions and Sileo. We deliver to enterprise quality standards, on schedule, with SLA accountability.',
  },
  {
    icon: 'document-text-outline',
    label: 'Record Digitisation\n& Gov Tech',
    description: 'Executed a full record digitisation programme for Jal Kal Prayagraj — converting legacy physical records into searchable, structured digital formats.',
  },
  {
    icon: 'briefcase-outline',
    label: 'Long-term\nVendor Partner',
    description: 'We operate as an extension of your team — accountable for quality, available when you need capacity, and invested in your product.',
  },
];

// ── Clients ───────────────────────────────────────────────────────────────
export const clients: ClientContent[] = [
  {
    name: 'Aurionpro Solutions',
    description:
      'BSE-listed global technology product company. KySam delivers software development, systems integration, and application support for Aurionpro transit and smart mobility platforms deployed across major Indian cities.',
    sector: 'Transit & Fare Technology',
    website: 'https://www.aurionpro.com',
  },
  {
    name: 'Sileo',
    description:
      'Smart mobility and transport technology platform. KySam provides software development and systems integration services for the Sileo application suite.',
    sector: 'Smart Mobility',
    website: 'https://thesileo.com',
  },
  {
    name: 'Jal Kal Prayagraj',
    description:
      'Municipal water authority of Prayagraj. KySam executed a comprehensive record digitisation programme — converting large volumes of legacy physical records into structured digital formats to improve data access and operational efficiency for the authority.',
    sector: 'Government & Municipal Services',
    website: '',
  },
];

// ── Services ──────────────────────────────────────────────────────────────
export const services: ServiceContent[] = [
  {
    slug: 'afc-system-development',
    name: 'AFC — Automatic Fare Collection',
    shortDescription:
      'Development, customisation, and integration of Automatic Fare Collection systems for transit authorities and technology product companies.',
    icon: 'git-network-outline',
  },
  {
    slug: 'transit-technology',
    name: 'Transit Technology',
    shortDescription:
      'Smart ticketing, passenger information systems, back-office reporting, and real-time data platforms for urban transit operators.',
    icon: 'navigate-outline',
  },
  {
    slug: 'software-development',
    name: 'Software Development & QA',
    shortDescription:
      'Full-cycle software engineering and quality assurance for enterprise product companies — from specification through release and post-launch support.',
    icon: 'code-slash-outline',
  },
  {
    slug: 'systems-integration',
    name: 'Systems Integration',
    shortDescription:
      'Integration of enterprise systems, payment gateways, APIs, and third-party platforms within AFC and mobility environments.',
    icon: 'git-merge-outline',
  },
  {
    slug: 'managed-support',
    name: 'Managed Support',
    shortDescription:
      'L2 and L3 application support, incident management, and SLA-based managed services for live AFC and transit deployments.',
    icon: 'settings-outline',
  },
  {
    slug: 'record-digitisation',
    name: 'Record Digitisation',
    shortDescription:
      'Converting physical and legacy records into structured digital formats — improving data access, searchability, and operational efficiency for government and enterprise organisations.',
    icon: 'document-text-outline',
  },
  {
    slug: 'technology-consulting',
    name: 'Technology Consulting',
    shortDescription:
      'Technology advisory for product companies — covering vendor selection, delivery partner assessment, capacity planning, and domain expertise in AFC and transit.',
    icon: 'bulb-outline',
  },
];

// ── Expertise ─────────────────────────────────────────────────────────────
export const expertiseAreas: string[] = [
  'Automatic Fare Collection (AFC)',
  'Transit & Smart Mobility Systems',
  'Enterprise Java / .NET',
  'Systems Integration & APIs',
  'Database Design & ETL',
  'Cloud Infrastructure & DevOps',
  'Quality Assurance & Test Automation',
  'L2/L3 Application Support',
  'Record Digitisation & Document Management',
];

export const industries: string[] = [
  'Public Transit & Urban Mobility',
  'Smart City Solutions',
  'Government & Municipal Services',
  'Financial Services & Payments',
  'Enterprise Software',
  'Logistics & Supply Chain',
];

// ── About ─────────────────────────────────────────────────────────────────
export const aboutContent = {
  eyebrow: 'FOUNDED · DELHI, INDIA',
  heading: 'Your Technology\nDelivery Partner',
  body: 'KySam Ventures is a Delhi-based IT services company. Our core work is Automatic Fare Collection (AFC) systems, enterprise software, and government technology. We function as a delivery partner for Aurionpro Solutions and Sileo, and as a specialist technology vendor for public-sector organisations — building, integrating, and supporting systems that underpin transit infrastructure and public services across India.',
  intro:
    'Our engineering team has direct, hands-on experience across AFC systems, transit technology, enterprise platforms, and government digitisation. We work with Aurionpro Solutions — a BSE-listed, globally active product company — and Sileo, as well as public-sector organisations such as Jal Kal Prayagraj, for whom we executed a full record digitisation programme.',
  philosophy:
    'We work with product companies and public organisations as a long-term vendor — accountable for delivery quality, SLA adherence, and scaling capacity when our clients need it.',
} as const;

export const coreValues: string[] = [
  'Delivery Ownership',
  'Quality Standards',
  'SLA Adherence',
  'Technical Depth',
  'Client Partnership',
  'Scalable Teams',
];

// ── Contact ───────────────────────────────────────────────────────────────
export const contactContent = {
  email: 'contact@kysamventures.com',
  phone: '+91 98809 24255',
  offices: [
    {
      city: 'Delhi',
      type: 'Office',
      address: '5/433-434, Mohalla Maharam,\nShahdara, Delhi-110032',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=5%2F433-434+Mohalla+Maharam+Shahdara+Delhi+110032',
    },
    {
      city: 'Noida',
      type: 'Cowork',
      address: 'HA 05, near Sanskar Public School,\nBlock A, Sector 104, Noida,\nUttar Pradesh 201304',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=HA+05+Sector+104+Noida+Uttar+Pradesh+201304',
    },
  ],
} as const;

// Marquee items used on home
export const SERVICE_TICKER = [
  'Automatic Fare Collection (AFC)',
  'Transit Technology',
  'Software QA & Engineering',
  'Systems Integration',
  'Managed Support',
  'Technology Consulting',
  'Record Digitisation',
  'Government Technology',
];
