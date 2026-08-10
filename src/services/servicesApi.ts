import { apiGet } from './apiClient';
import type { Service } from '../types/api.types';

export function getServices(): Promise<Service[]> {
  return apiGet<Service[]>('/services');
}

export function getServiceBySlug(slug: string): Promise<Service> {
  return apiGet<Service>(`/services/${slug}`);
}
