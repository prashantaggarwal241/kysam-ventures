import type { IoniconName } from '../components/ui/IconBadge';

export interface WhyKysamItem {
  icon: IoniconName;
  label: string;
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

export const homeContent = {
  eyebrow: 'BUILD · GROW · CREATE VALUE',
  heading: 'Technology.\nExpertise.\nBusiness impact.',
  subtext:
    'We help businesses modernise platforms, build scalable solutions, and create lasting technology partnerships.',
  factCards: [
    { stat: 'Graduates and engineers', label: 'From renowned universities' },
    { stat: 'Executive and consulting', label: 'Partner or advisor roles' },
    { stat: 'Target-oriented delivery', label: 'Outcomes over output' },
  ] as FactCard[],
} as const;

export const whyKysam: WhyKysamItem[] = [
  { icon: 'people-outline', label: 'Experienced\nteam' },
  { icon: 'shield-checkmark-outline', label: 'Reliable\ndelivery' },
  { icon: 'time-outline', label: 'Long-term\npartnerships' },
];

export const services: ServiceContent[] = [
  {
    slug: 'technology-consulting',
    name: 'Technology Consulting',
    shortDescription: 'Strategic guidance to align technology with your business objectives.',
    icon: 'laptop-outline',
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    shortDescription: 'Custom software solutions built to scale with your business.',
    icon: 'code-slash-outline',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    shortDescription: 'Streamlined cloud infrastructure and CI/CD pipelines for faster delivery.',
    icon: 'cloud-outline',
  },
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation',
    shortDescription: 'End-to-end transformation roadmaps that modernise how you operate.',
    icon: 'flash-outline',
  },
  {
    slug: 'it-advisory',
    name: 'IT Advisory',
    shortDescription: 'Expert advisory services for informed, risk-aware technology decisions.',
    icon: 'bulb-outline',
  },
  {
    slug: 'managed-technology-services',
    name: 'Managed Technology Services',
    shortDescription: 'Comprehensive managed services to keep your systems running smoothly.',
    icon: 'settings-outline',
  },
];

export const expertiseAreas: string[] = [
  'Enterprise Software',
  'Cloud Computing',
  'Software Architecture',
  'Digital Transformation',
  'Application Modernisation',
  'DevOps & CI/CD',
  'API & Microservices',
  'Data & Integration',
];

export const industries: string[] = [
  'Financial Services',
  'Insurance',
  'Logistics & Supply Chain',
  'Healthcare',
  'Enterprise Technology',
];

export const aboutContent = {
  eyebrow: 'FOUNDED · DELHI, INDIA',
  heading: 'Building Technology Partnerships That Last',
  body: 'KySam Ventures is a Delhi-based IT consultancy dedicated to helping businesses modernise platforms, build scalable solutions, and create lasting technology partnerships. Founded with a mission to bridge the gap between business needs and technology capabilities, we deliver enterprise-grade solutions with the agility of a boutique firm.',
  intro:
    'KySam Ventures was formed by a group of professionals with wide exposure across information technology — young, qualified business graduates and engineers from renowned universities. Our team has consistently provided reliable support and consultancy to a wide variety of corporate houses, as executive, business partner, and consultant.',
  philosophy:
    'Our philosophy is building long-term business partnerships — where interpersonal relationship, reliability, assured quality, and target-oriented modern technology are the major building blocks.',
} as const;

export const coreValues: string[] = [
  'Trust',
  'Reliability',
  'Quality',
  'Innovation',
  'Partnership',
  'Excellence',
];

export const contactContent = {
  email: 'contact@kysamventures.com',
  location: 'Delhi, India',
} as const;
