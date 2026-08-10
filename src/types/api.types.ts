export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  founded: string;
  email: string;
  phone: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Expertise {
  id: string;
  title: string;
  description: string;
  proficiency: number;
  category: string;
  order: number;
}

export interface EnquiryCreateRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type EnquiryStatus = 'Pending' | 'Contacted' | 'Resolved';

export interface EnquiryResponse {
  id: string;
  status: EnquiryStatus;
  createdAt: string;
}
